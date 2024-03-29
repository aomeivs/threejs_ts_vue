/*
 * @Author: zhou lei
 * @Date: 2024-03-12 09:20:35
 * @LastEditTime: 2024-03-29 16:44:37
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.ts
 
 */
import { createCamera } from '@/components/helpers/camera'
import { createCSS2Renderer, createRenderer } from '@/components/helpers/renderer'
import { createScene } from '@/components/helpers/scene'
import { creatControls, type ExtendedOrbitControls } from '@/components/helpers/controls'
import { createLights } from '@/components/helpers/lights'
import { Resizer } from '@/components/helpers/Resizer'
import {
  type AnimationAction,
  type PerspectiveCamera,
  type Scene,
  type WebGLRenderer,
  AxesHelper,
  DirectionalLightHelper,
  Vector2,
  Raycaster,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  CameraHelper,
  Object3D,
  Box3,
  Texture,
  Group
} from 'three'
import { Loop } from '@/components/helpers/Loop'
import { loadModel, loadArrow, loadBackground } from '@/components/models/gltf/animal'
import { loadingManager } from '@/components/helpers/loadingManager'
// 调试工具
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as TWEEN from '@tweenjs/tween.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { ModelEntity, ModelParsed } from '@/components/models/gltf/animal'
import { createGUI } from '@/components/helpers/gui'
import { ref } from 'vue'
import { ViewHelper } from 'three/examples/jsm/Addons.js'
import useEffectHooks, { type OutlineEffectType } from '@/components/effect/outline'
import { eqipmentMeshCollection, htmlMeshCollection } from './views/home/data'
import type { GetequipmentStatusRT } from './types/api'
import { useHomeStore } from './stores/home'
import { storeToRefs } from 'pinia'
import pinia from './stores'
import { globalConfig } from './config/config'
import { initExplodeModel } from './components/effect/exploder'
import { miniMapInit, miniMapTick } from './components/effect/miniMap'
const { equipmentList } = storeToRefs(useHomeStore(pinia))
export type Equipment = Partial<{
  name: string
  alias: string
  userData: any
  date: any
}>
const isDebug = globalConfig.debug

let camera: PerspectiveCamera
let controls: ExtendedOrbitControls
let renderer: WebGLRenderer
let cssRenderer: CSS2DRenderer
let scene: Scene
let loop: Loop
let stats: Stats
let textture: Texture
let css2dLabel: CSS2DObject
// const turbineLabels = []
let outline: OutlineEffectType
let count = 0
const equipmentMaterialMap = new Map()
const show = ref(false)
const equipment = ref<HtmlMeshCollection>()

export interface HtmlMeshCollection extends Partial<GetequipmentStatusRT> {
  target: string
  meshName: string
  alias: string
  position: string
  state: Number
}
export interface SelectObject extends Object3D {
  ancestors: Object3D
}
//  声明一个 EnumerationModelType
export enum ModelName {
  FACTORY = 'factory', // 工厂模型
  TURBINE = 'turbine', // 风车
  EQUIPMENT = 'equipment' // 设备
}
export type DefaultParamsKey = 'color' | 'emissive' | 'emissiveIntensity'
class App {
  actions: { [key: string]: AnimationAction }
  model: ModelEntity
  container: HTMLElement
  isOrbiting: boolean
  cameraLayer: number
  constructor(container: HTMLElement) {
    this.container = container
    this.actions = {}
    this.model = {}
    this.isOrbiting = false
    this.cameraLayer = 0
    // 控制GUI\STATS
    {
      stats = new Stats() //一个仪表板，用于显示每秒帧数，监视性能
      isDebug && createGUI(this) //.hide()
    }

    // scene\camera\renderer\light\helper

    scene = createScene() //创建场景const scene = new THREE.Scene();
    camera = createCamera(container) //常见相机const camera = new PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number)
    renderer = createRenderer() //创建渲染器
    cssRenderer = createCSS2Renderer() //创建2d渲染器
    {
      const { ambientLight, directionalLights } = createLights() //灯光
      const axesHelper = new AxesHelper(5) //坐标轴
      const lightHelper: DirectionalLightHelper[] = [] //平行光
      directionalLights.forEach((light, index) => {
        if (index === 0 && isDebug) {
          const cameraHelper = new CameraHelper(light.shadow.camera) //模拟相机
          lightHelper.push(new DirectionalLightHelper(light, 0.2))

          scene.add(cameraHelper, axesHelper, ...lightHelper) //将上述辅助，邓光添加到场景
        }
      })
      scene.add(ambientLight, ...directionalLights)
    }
    const viewHelper = new ViewHelper(camera, renderer.domElement) //右下角坐标系
    Object.assign(viewHelper, { tick: (delta: number) => viewHelper.update(delta) }) //给viewHelper添加一个tick方法：viewHelper.update()
    controls = creatControls(camera, cssRenderer.domElement)
    // 看向风车位置
    // controls.target.set(0, 1.5, 0)
    // 最好视角
    controls.target.set(0, 0, 0)
    controls.addEventListener('change', () => {
      // console.log('change', camera.position)
      count++
      if (count > 1) this.isOrbiting = true //监听相机改变，打印相机位置
    })
    container.appendChild(cssRenderer.domElement)
    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)
    // effectComposer Renderer替代WebGlRenderer
    // outline 渲染会导致抗锯齿问题和其它显示问题
    outline = useEffectHooks(renderer, scene, camera).outlineEffect([])
    loop = new Loop(camera, scene, renderer, cssRenderer, stats, viewHelper)
    loop.updatables.push(controls, outline.compose, TWEEN)
    // 响应式renderer
    {
      new Resizer(container, camera, renderer, cssRenderer, outline.compose) //刚加载设置大小，以及监控浏览器窗口变化大小变化
    }
  }
  async init() {
    textture = await loadBackground(scene)
    // const { scene: animalScene, action } = await loadModel(loadingManager)
    this.model = await loadModel(loadingManager)
    // 设置加载模型
    this.setLoadModel()
    // 一种一进入就显示设备标签
    this.createLabels()
    /**
     * 加载箭头,模型路线上的动画箭头
     */
    this.createArrow()

    // 小地图组件 需要完善
    miniMapInit({ scene: scene, container: this.container, target: this.model.factory?.model })
    loop.updatables.push({
      name: 'miniMap',
      tick: miniMapTick
    })

    // 模型爆炸 exploder
    initExplodeModel(this.model.factory?.model!)
  }
  setLoadModel() {
    this.initFactory(this.model.factory!)
    //  equipment 材质设置以及部件存储
    this.initEquipment(this.model.equipment!)
    // turbine 材质设置
    this.initTurbine(this.model.turbine!)
  }
  async createArrow() {
    const pointName = Array.from(Array(15).keys(), (num) => 'DD_JT' + +(num + 1))
    const positions = pointName.map((name) => {
      const worldPosition = new Vector3()
      const mesh = scene.getObjectByName(name)!
      if (!mesh) {
        return worldPosition
      }
      mesh.getWorldPosition(worldPosition)
      mesh.visible = false
      return worldPosition
    })
    const arrowGroup = new Group()
    arrowGroup.name = 'arrowGroup'
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i].toArray()
      // pos[1] = pos[1] + 0.2
      const { arrow, texture: arrowTexture } = await loadArrow(pos)
      arrow.name = 'C_DD_JT' + +(i + 1)
      arrowTexture.name = 'C_DD_JT' + +(i + 1)
      arrow.scale.multiplyScalar(0.3)
      if ([4, 5, 13, 14, 15].includes(i + 1)) {
        arrow.rotation.set(Math.PI / 2, 0, 0)
      } else {
        arrow.rotation.set(Math.PI / 2, Math.PI, 0)
      }

      arrow.material.emissive.setHex(0x00ff00)
      loop.updatables.push(arrowTexture)
      arrowGroup.add(arrow)
    }
    scene.add(arrowGroup)
  }
  initEquipment(modelParsed: ModelParsed, layer: number = 1) {
    const { model, action } = modelParsed
    if (action) {
      action.play()
      this.actions[action.name!] = action
      loop.updatables.push(model)
    }
    // 发电机模型
    model.scale.multiplyScalar(0.001)
    this.setModelAncestors(
      eqipmentMeshCollection.map((mesh) => mesh.meshName),
      model
    )
    model.traverse((child: Object3D) => {
      child.layers.set(layer)
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        newMaterial.roughness = 0
        newMaterial.metalness = 0.8
        meshChild.material = newMaterial
      }
    })
    scene.add(model)
  }
  initTurbine(modelParsed: ModelParsed, layer: number = 1) {
    const { model, action } = modelParsed
    if (action) {
      action.play()
      this.actions[action.name!] = action
      loop.updatables.push(model)
    }
    // 发电机模型
    model.scale.multiplyScalar(0.001)

    model.traverse((child: Object3D) => {
      child.layers.set(layer)
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        newMaterial.roughness = 0.7
        newMaterial.metalness = 0.7
        meshChild.material = newMaterial
      }
    })
    scene.add(model)
  }
  initFactory(modelParsed: ModelParsed, layer: number = 0) {
    const { model, action } = modelParsed
    if (action) {
      this.actions[action.name!] = action
      loop.updatables.push(model)
    }
    model.scale.multiplyScalar(0.03)
    model.position.set(-2, 0, -2)
    this.setModelAncestors(
      htmlMeshCollection.map((mesh) => mesh.meshName),
      model
    )
    // factory 材质设置
    model.traverse((child: any) => {
      child.layers.set(layer)
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const childMaterial = meshChild.material as MeshStandardMaterial
        const newMaterial = childMaterial.clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        if (meshChild.name.includes('支架盖')) {
          newMaterial.emissive.setHex(0x000000)
          newMaterial.roughness = 1
          newMaterial.metalness = 0
        } else if (meshChild.name.includes('地面')) {
          newMaterial.roughness = 0
          newMaterial.metalness = 0
        } else {
          newMaterial.roughness = 0.5
          newMaterial.metalness = 0.9
        }
        // 暂时不需要为单独物体设置不同的映射纹理，由scene提供统一的映射纹理即可；
        newMaterial.envMap = textture
        newMaterial.envMapIntensity = 0.3
        meshChild.material = newMaterial
        meshChild.castShadow = true
        meshChild.receiveShadow = true
      }
    })
    scene.add(model)
  }
  //为需要渲染的模型设置父级
  setModelAncestors(groupsName: string[], model: Object3D) {
    groupsName.forEach((groupName) => {
      const selecmodel = model.getObjectByName(groupName)!
      equipmentMaterialMap.set(groupName, selecmodel)
      selecmodel &&
        selecmodel.traverse((child) => {
          ;(child as Mesh).isMesh &&
            Object.assign(child, {
              ancestors: selecmodel
            })
        })
    })
  }
  // render() {
  //   renderer.render(scene, camera)
  // }
  start() {
    loop.start()
    console.log('this.updatables', loop.updatables)
  }
  play(actionName: string, play: boolean) {
    this.actions[actionName].paused = !play
    // action.play()在初始被调用时，不需要设置以下！
    // play && this.actions[actionName].play()
  }
  show(showName: string, show: boolean) {
    const model = scene.getObjectByName(showName)
    if (model) {
      model.visible = show
    }
  }
  showTurbineLabel(show: boolean) {
    css2dLabel.visible = show
  }

  createLineSVG(targets: HtmlMeshCollection[]) {
    document.querySelector('#svgContainer')?.remove()
    // Create SVG line
    const svgNS = 'http://www.w3.org/2000/svg'
    const svgContainer = document.createElementNS(svgNS, 'svg')
    svgContainer.setAttribute('id', 'svgContainer')
    svgContainer.setAttribute('width', '100%')
    svgContainer.setAttribute('height', '100%')
    targets.forEach((item: HtmlMeshCollection) => {
      const mesh = scene.getObjectByName(item.meshName) as Mesh
      const element: HTMLElement = document.querySelector('#' + item.target)!
      if (!element) return
      const svgLine = document.createElementNS(svgNS, 'path')
      if (!svgLine) return
      svgLine.setAttribute('class', 'pathshadow')
      svgLine.setAttribute('stroke', 'rgb(0, 148, 253)')
      svgLine.setAttribute('stroke-width', '2.5')
      svgLine.setAttribute('fill', 'none')
      svgContainer.appendChild(svgLine)

      mesh &&
        Object.assign(mesh, {
          tick: () => {
            // 把mesh局部坐标转换到世界坐标
            const worldPosition = new Vector3()
            mesh.getWorldPosition(worldPosition)
            // 矩阵获取的是局部坐标（过时的方法）
            // const meshPosition = new Vector3()
            // meshPosition.setFromMatrixPosition(mesh.matrixWorld)
            // 获取网格的高度
            const bbox = new Box3().setFromObject(mesh)
            const meshHeight = bbox.max.y - bbox.min.y
            // // 将网格位置向上调整其高度的一半
            worldPosition.y = meshHeight / 4 + worldPosition.y
            const screenPosition = worldPosition.project(camera)
            const screenX = ((screenPosition.x + 1) * this.container.clientWidth) / 2
            const screenY = ((-screenPosition.y + 1) * this.container.clientHeight) / 2
            const targetX =
              element.offsetLeft +
              element.clientWidth -
              element.children[2].getBoundingClientRect().width / 2
            const targetY = element.offsetTop + element.clientHeight / 2
            const midX = (screenX + targetX) / 2
            const midY = (screenY + targetY) / 2
            //  L ${midX} ${midY}
            const path = `M ${screenX} ${screenY} L ${midX} ${midY}  L ${targetX} ${midY} L ${targetX} ${targetY}`
            svgLine.setAttribute('d', path)
          }
        })
      loop.updatables.push(mesh)
    })
    this.container.appendChild(svgContainer)
  }
  stop() {
    loop.stop()
  }
  /**
   *
   * @param name 监听鼠标
   */
  onPointerClick(models: Object3D[]) {
    // 监听mouseup事件
    this.container.addEventListener('click', async (event: MouseEvent) => {
      if (this.isOrbiting) {
        ///1.处理区分是：鼠标点击事件/还是鼠标移动改变相机
        this.isOrbiting = false
        return
      }
      const mouse = new Vector2()
      // mouse.x = (<鼠标相对于可视区域的横坐标> / <可视区域的宽>) * 2 - 1;
      // mouse.y = -(<鼠标相对于可视区域的纵坐标> / <可视区域的高>) * 2 + 1;
      mouse.x = (event.offsetX / this.container.clientWidth) * 2 - 1
      mouse.y = -(event.offsetY / this.container.clientHeight) * 2 + 1
      const raycaster = new Raycaster()
      raycaster.layers.set(this.cameraLayer)
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(models, true)
      if (intersects.length <= 0) {
        return false
      }
      console.log('[当前点击的部件]:', intersects)
      // const selectObject = intersects[0].object as Mesh
      const selectObject = (intersects[0].object as SelectObject).ancestors
      // 高亮选择部件
      if (this.setSelectMap(selectObject)) {
        this.updateLabal(intersects[0]) //更新标注
      }
    })
  }
  /**
   * 隐藏弹框，恢复部件颜色
   * @param selectObject
   */
  clearSelect(selectObject: any) {
    outline.outlinePass.selectedObjects = []
    css2dLabel.visible = false
    selectObject &&
      selectObject.traverse((child: any) => {
        if (child.isMesh) {
          child.material.emissive.setHex(child.currentHex)
        }
      })
  }

  /**
   * 如果模型上存在点击的部件，执行createLineSVG绘制连线，通过equipment变量和outline.outlinePass.selectedObjects控制是否重复点击相同部件，重复点击，调用clearSelect将上一次部件恢复
   * equipment：上次记录；selectObject：选择；
   * clearSelect()：弹框隐藏，部件颜色恢复
   * createLineSVG([])：画线清除
   * selectAnimate()：部件闪烁
   * @param selectObject
   * @returns boolean
   */
  setSelectMap(selectObject: Object3D): boolean {
    console.log('selectObject', selectObject)
    if (selectObject) {
      // 从equipmentMaterialMap中获取selectObject的材质
      const equipmentMaterial = equipmentMaterialMap.get(selectObject.name)

      // 如果获取到材质
      if (equipmentMaterial) {
        // 创建线SVG，并过滤出selectObject的meshName
        this.createLineSVG(htmlMeshCollection.filter((mesh) => selectObject.name === mesh.meshName)) //通过匹配过滤只绘制一条线
        // 如果equipment的name等于selectObject的name，且outlinePass的selectedObjects长度大于0
        if (
          equipment.value?.meshName === selectObject.name &&
          outline.outlinePass.selectedObjects.length > 0
        ) {
          // 清除selectObject
          this.clearSelect(selectObject)
          // 创建线SVG，并清空
          this.createLineSVG([])

          return false
        } else {
          // 清除equipmentMaterialMap中的equipment的材质
          this.clearSelect(equipmentMaterialMap.get(equipment.value?.meshName))
          const obj = htmlMeshCollection
            .concat(eqipmentMeshCollection)
            .find((html) => html.meshName === selectObject.name)
          if (obj) {
            const child = equipmentList.value.find((child) => child.equipmentCode == obj.target)
            child && Object.assign(obj, child)
          }
          equipment.value = obj
          // 设置outlinePass的selectedObjects为equipmentMaterial
          outline.outlinePass.selectedObjects = [equipmentMaterial]
          // 移除所有TWEEN
          TWEEN.removeAll()
          // 遍历equipmentMaterial的子节点
          equipmentMaterial.traverse((child: any) => {
            // 如果子节点是Mesh
            if (child.isMesh) {
              // 设置emissiveIntensity为0.5
              child.material.emissiveIntensity = 0.5
              // 设置emissive的值为0x00ff00
              child.material.emissive.setHex(0x00ff00)
              // 调用selectAnimate函数，闪烁动画
              this.selectAnimate(child)
            }
          })
        }
      }
      return true
    } else {
      // 清除equipmentMaterialMap中的equipment的材质
      this.clearSelect(equipmentMaterialMap.get(equipment.value?.meshName))
      // 创建线SVG，并清空
      this.createLineSVG([])
      return false
    }
  }
  /**
   * 部件闪烁动画
   * @param child
   */
  selectAnimate(
    child: Mesh,
    start: Partial<Record<keyof MeshStandardMaterial, any>> = {},
    end: Partial<Record<keyof MeshStandardMaterial, any>> = {},
    time: number = 500,
    repeat: number = 10
  ) {
    const defaultParams: Partial<Record<keyof MeshStandardMaterial, any>> = {
      emissiveIntensity: 0.5
    }

    const endParams: Partial<Record<keyof MeshStandardMaterial, any>> = { emissiveIntensity: 0.2 }
    Object.assign(defaultParams, start)
    Object.assign(endParams, end)
    new TWEEN.Tween(defaultParams)
      .to(endParams, time)
      .repeat(repeat)
      .yoyo(true)
      .onUpdate((obj: any) => {
        Object.entries(defaultParams).map((item) => {
          const key = item[0] as DefaultParamsKey
          obj[key] && ((child.material as MeshStandardMaterial)[key] = obj[key])
        })
      })
      .repeatDelay(100)
      .start()
  }
  /**
   * 弹框更新
   * @param intersect
   */
  updateLabal(intersect: any) {
    css2dLabel.visible = !show.value
    const point = intersect.point
    css2dLabel.position.set(point.x, point.y, point.z)
  }
  /**
   * 效果：点击弹窗标注；creat=》添加场景=》监听鼠标事件onPointerClick()
   * @param target
   */
  createTurbineLabel(target: string) {
    const dom: HTMLElement = document.querySelector(target)!
    // dom.style.background = 'rgba(100,100,0,0.5)'
    css2dLabel = new CSS2DObject(dom)
    css2dLabel.name = 'css2DLabel'
    css2dLabel.scale.set(0.003, 0.003, 0.003)

    if (show.value) {
      css2dLabel.visible = true
    } else {
      css2dLabel.visible = false
    }
    dom.addEventListener('pointerdown', () => {
      console.log('label.element.addEventListener("click')
    })
    scene.add(css2dLabel)
    this.onPointerClick([this.model.factory!.model, this.model.equipment!.model])
  }
  /**
   * 效果：模型上初始化显示的标注；html元素=》网格模型对象=》定位=》添加到场景
   */
  createLabels() {
    let labelGroup = scene.getObjectByName('labelGroup') as Group
    if (labelGroup) {
      this.updateLabels(labelGroup, true)
    } else {
      labelGroup = new Group()
      labelGroup.name = 'labelGroup'
      this.updateLabels(labelGroup)
      scene.add(labelGroup)
    }
  }
  updateLabels(labelGroup: Group, cache: boolean = false) {
    let mesh
    const worldPosition = new Vector3()
    if (cache) {
      labelGroup.traverse((csslabel: any) => {
        mesh = this.model.factory?.model.getObjectByName(csslabel.name)!
        if (!mesh) return
        const box3 = new Box3().setFromObject(mesh)
        box3.getCenter(worldPosition)
        // mesh.getWorldPosition(worldPosition)
        csslabel!.position.set(worldPosition.x, worldPosition.y, worldPosition.z)
      })
    } else {
      htmlMeshCollection.forEach((obj) => {
        mesh = scene.getObjectByName(obj.meshName)
        if (!mesh) return
        const dom: HTMLElement = document.querySelector(`#css2object-${obj.target}`)!
        if (!dom) return

        const csslabel = new CSS2DObject(dom)
        csslabel.name = obj.meshName
        dom.addEventListener('pointerdown', () => {})

        csslabel.scale.set(0.003, 0.003, 0.003)
        csslabel.visible = true
        // css2d标签
        labelGroup.add(csslabel)
        // 把mesh局部坐标转换到世界坐标
        mesh.getWorldPosition(worldPosition)
        csslabel!.position.set(worldPosition.x, worldPosition.y, worldPosition.z)
      })
    }
  }

  createCameraTween(pos: Vector3, target: Vector3 = controls.target) {
    new TWEEN.Tween({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      tx: controls.target.x,
      ty: controls.target.y,
      tz: controls.target.z
    })
      .to(
        {
          x: pos.x,
          y: pos.y,
          z: pos.z,
          tx: target.x,
          ty: target.y,
          tz: target.z
        },
        800
      )
      .onUpdate((obj) => {
        camera.position.set(obj.x, obj.y, obj.z)
        controls.target.set(obj.tx, obj.ty, obj.tz)
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start()
  }
  /**
   * 视角控制
   * @param type
   */
  rotatCamera(type: number) {
    const targetPosition: any = {
      1: { x: 0, y: 13, z: 9 },
      2: { x: 0, y: 18, z: 0 },
      3: { x: -10, y: 10, z: 10 }
    }
    this.createCameraTween(targetPosition[type], new Vector3(0, 0, 0))
  }
  changeLayers(layer: number) {
    this.cameraLayer = layer
    css2dLabel.layers.set(layer)
    css2dLabel.visible = false
    camera.layers.set(layer)
  }
}
export { App, show, equipment, camera, controls, scene, loop }
