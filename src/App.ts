/*
 * @Author: zhou lei
 * @Date: 2024-03-12 09:20:35
 * @LastEditTime: 2024-03-15 17:59:12
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.ts
 * 联系方式:910592680@qq.com
 */
import { createCamera } from '@/components/helpers/camera'
import { createCSS2Renderer, createRenderer } from '@/components/helpers/renderer'
import { createScene } from '@/components/helpers/scene'
import { creatControls } from '@/components/helpers/controls'
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
  Box3
} from 'three'
import { Loop } from '@/components/helpers/Loop'
import { loadAnimals, loadArrow, loadBackground } from '@/components/models/gltf/animal'
import { loadingManager } from '@/components/helpers/loadingManager'
// 调试工具
import Stats from 'three/examples/jsm/libs/stats.module.js'
import * as TWEEN from '@tweenjs/tween.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { ModelEntity } from '@/components/models/gltf/animal'
import { createGUI } from '@/components/helpers/gui'
import { ref } from 'vue'
import { ViewHelper } from 'three/examples/jsm/Addons.js'
import useEffectHooks, { type OutlineEffectType } from '@/components/effect/outline'
import { htmlMeshCollection } from './views/home/data'

export type Equipment = Partial<{
  name: string
  alias: string
  userData: any
  date: any
}>
const isDEV = import.meta.env.VITE_HOST_DEBUG
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let cssRenderer: CSS2DRenderer
let scene: Scene
let loop: Loop
let stats: Stats
let turbineLabel: any
const turbineLabels = []
let outline: OutlineEffectType
let count = 0
let w = 0
let h = 0
const equipmentMaterialMap = new Map()
const show = ref(false)
const equipment = ref<Equipment>({})
export type HtmlMeshCollection = {
  target: string
  meshName: string
  alias: string
  position: string
}
export interface SelectObject extends Object3D {
  ancestors: Object3D
}
//  声明一个 EnumerationModelType
enum ModelName {
  FACTORY = 'factory', // 工厂模型
  TURBINE = 'turbine', // 风车
  EQUIPMENT = 'equipment' // 设备
}
class App {
  actions: { [key: string]: AnimationAction }
  model: ModelEntity
  container: HTMLElement
  isOrbiting: boolean
  constructor(container: HTMLElement) {
    this.container = container
    this.actions = {}
    this.model = {}
    this.isOrbiting = false
    // 控制GUI\STATS
    {
      stats = new Stats()
      isDEV === '1' && createGUI(this) //.hide()
    }

    // scene\camera\renderer\light\helper
    w = (container && container.clientWidth) || window.innerWidth
    h = (container && container.clientHeight) || window.innerHeight
    scene = createScene()
    camera = createCamera(container)
    renderer = createRenderer()
    cssRenderer = createCSS2Renderer()
    {
      const { ambientLight, directionalLights } = createLights()
      const axesHelper = new AxesHelper(5)
      const lightHelper: DirectionalLightHelper[] = []
      directionalLights.forEach((light, index) => {
        if (index === 0 && isDEV === '1') {
          const cameraHelper = new CameraHelper(light.shadow.camera)
          lightHelper.push(new DirectionalLightHelper(light, 0.2))

          scene.add(cameraHelper, axesHelper, ...lightHelper)
        }
      })
      scene.add(ambientLight, ...directionalLights)
    }
    const viewHelper = new ViewHelper(camera, renderer.domElement)
    Object.assign(viewHelper, { tick: (delta: number) => viewHelper.update(delta) })
    const controls = creatControls(camera, cssRenderer.domElement)
    // 看向风车位置
    // controls.target.set(0, 1.5, 0)
    // 最好视角
    controls.target.set(0, 0, 0)
    controls.addEventListener('change', () => {
      // console.log('change', camera.position)
      count++
      if (count > 1) this.isOrbiting = true
    })
    container.appendChild(cssRenderer.domElement)
    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)
    loop = new Loop(camera, scene, renderer, cssRenderer, stats, viewHelper)

    outline = useEffectHooks(renderer, scene, camera).outlineEffect([])
    //this.outline([])
    // loop.updatables.push(controls)
    // outline 渲染会导致抗锯齿问题和其它显示问题
    loop.updatables.push(controls, outline.compose)

    // 响应式renderer
    {
      new Resizer(container, camera, renderer, cssRenderer, outline.compose)
    }
  }
  async init() {
    loop.updatables.push(TWEEN)
    await loadBackground(scene)
    // const { scene: animalScene, action } = await loadAnimals(loadingManager)
    this.model = await loadAnimals(loadingManager)
    Object.entries(this.model).forEach((data) => {
      const { model, action } = data[1]
      const name = data[0]
      if (action) {
        this.actions[action.name!] = action
        loop.updatables.push(model)
      }
      // 模型同步缩放合适尺寸
      if (name == ModelName.FACTORY) {
        model.scale.multiplyScalar(0.03)
        model.position.set(-2, 0, -2)
        this.setModelAncestors(['DD_PENGFANG1'], model)
        // factory 材质设置
        this.initFactory()
        scene.add(model)
      } else {
        // 发电机模型
        model.scale.multiplyScalar(0.001)
        scene.add(model)
        // equipment 材质设置以及部件存储
        this.initEquipment()
        // turbine 材质设置
        this.initTurbine()
      }
    })
    // this.createTurbineLabel('#css2object')
    this.createLabels()
    /**
     * 加载箭头
     */
    this.createArrow()
  }
  async createArrow() {
    const pointName = ['支架盖1_20', '支架盖042', '支架盖039', '支架盖024']
    const positions = pointName.map((name) => {
      const worldPosition = new Vector3()
      const mesh = scene.getObjectByName(name)!
      if (!mesh) {
        return worldPosition
      }
      mesh.getWorldPosition(worldPosition)
      // mesh.visible = false
      return worldPosition
    })
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i].toArray()
      pos[1] = pos[1] + 0.2
      const { arrow, texture } = await loadArrow(pos)
      arrow.name = 'arrow'
      arrow.scale.multiplyScalar(0.3)
      arrow.rotation.set(0, Math.PI, 0)
      arrow.material.emissive.setHex(0x00ff00)
      loop.updatables.push(texture)
      scene.add(arrow)
    }
  }
  initEquipment() {
    this.model.equipment.model.traverse((child: any) => {
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        newMaterial.roughness = 0
        newMaterial.metalness = 0.8
        meshChild.material = newMaterial
        equipmentMaterialMap.set(meshChild.name, meshChild) // Map 存储各个部件
      }
    })
  }
  initTurbine() {
    this.model.turbine.model.traverse((child: any) => {
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        newMaterial.roughness = 0.7
        newMaterial.metalness = 0.7
        meshChild.material = newMaterial
        equipmentMaterialMap.set(meshChild.name, meshChild) // Map 存储各个部件
      }
    })
  }
  initFactory() {
    this.model.factory.model.traverse((child: any) => {
      const meshChild = child as Mesh & {
        currentHex?: number
      }
      if (meshChild.isMesh) {
        const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
        meshChild.currentHex = newMaterial.emissive.getHex()
        if (meshChild.name.includes('支架盖')) {
          newMaterial.emissive.setHex(0x000000)
          newMaterial.roughness = 1
          newMaterial.metalness = 0
        } else if (meshChild.name.includes('地面')) {
          newMaterial.roughness = 1
          newMaterial.metalness = 0.1
        } else {
          newMaterial.roughness = 0.2
          newMaterial.metalness = 0.7
        }
        meshChild.castShadow = true
        meshChild.receiveShadow = true
        newMaterial.envMapIntensity = 0.3
        meshChild.material = newMaterial
      }
    })
  }

  setModelAncestors(groupsName: string[], model: Object3D) {
    groupsName.forEach((groupName) => {
      const selecmodel = model.getObjectByName(groupName)!
      equipmentMaterialMap.set(groupName, selecmodel)
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
  }
  play(actionName: string, play: boolean) {
    const action = this.actions[actionName]
    if (action) {
      if (play) {
        action.paused = false
        action.play()
      } else {
        action.paused = true
      }
    }
  }
  show(showName: string, show: boolean) {
    const model = scene.getObjectByName(showName)
    if (model) {
      model.visible = show
    }
  }
  showTurbineLabel(show: boolean) {
    turbineLabel.visible = show
  }

  createLineSVG(targets: HtmlMeshCollection[]) {
    document.querySelector('#svgContainer')?.remove()
    const scale =
      window.innerWidth / window.innerHeight < 1920 / 1080
        ? window.innerWidth / 1920
        : window.innerHeight / 1080
    // Create SVG line
    const svgNS = 'http://www.w3.org/2000/svg'
    const svgContainer = document.createElementNS(svgNS, 'svg')
    svgContainer.setAttribute('id', 'svgContainer')
    svgContainer.setAttribute('width', '100%')
    svgContainer.setAttribute('height', '100%')
    targets.forEach((item: HtmlMeshCollection) => {
      const mesh = scene.getObjectByName(item.meshName) as Mesh
      const element = document.querySelector('#' + item.target)!
      if (!element) return
      const targetRect = element.getBoundingClientRect()
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
            // Convert Mesh position to screen coordinates
            const meshPosition = new Vector3()
            meshPosition.setFromMatrixPosition(mesh.matrixWorld)
            // 获取网格的高度
            const bbox = new Box3().setFromObject(mesh)
            const meshHeight = bbox.max.y - bbox.min.y
            // 将网格位置向上调整其高度的一半
            meshPosition.y = meshHeight
            const screenPosition = meshPosition.project(camera)
            const screenX =
              ((screenPosition.x + 1) * w) / 2 + this.container.getBoundingClientRect().left / scale
            const screenY =
              ((-screenPosition.y + 1) * h) / 2 + this.container.getBoundingClientRect().top / scale
            // Get HTML element position
            const iconPosition =
              element.children[2].getBoundingClientRect().width +
              (element.getBoundingClientRect().right -
                element.children[2].getBoundingClientRect().left) /
                2
            const targetX =
              (targetRect.left + targetRect.right + targetRect.width - iconPosition) / 2 / scale
            const targetY = (targetRect.top + targetRect.bottom) / 2 / scale

            const midX = (screenX + targetX) / 2
            const midY = (screenY + targetY) / 2
            //  L ${midX} ${midY}
            //const path = `M ${screenX} ${screenY} L ${targetX} ${midY} L ${targetX} ${targetY}`
            const path = `M ${screenX} ${screenY} L ${midX} ${midY}  L ${targetX} ${midY} L ${targetX} ${targetY}`

            svgLine.setAttribute('d', path)
          }
        })
      loop.updatables.push(mesh)
    })
    // this.container.appendChild()
    document.body.appendChild(svgContainer)
  }
  stop() {
    loop.stop()
  }
  onPointerClick(name: string) {
    // 监听mouseup事件
    document.addEventListener('click', async (event: MouseEvent) => {
      if (this.isOrbiting) {
        this.isOrbiting = false
        return
      }
      const mouse = new Vector2()
      const scale =
        window.innerWidth / window.innerHeight < 1920 / 1080
          ? window.innerWidth / 1920
          : window.innerHeight / 1080
      mouse.x =
        (((event.clientX - this.container.getBoundingClientRect().left) /
          this.container.clientWidth) *
          2) /
          scale -
        1
      mouse.y =
        (-(
          (event.clientY - this.container.getBoundingClientRect().top) /
          this.container.clientHeight
        ) *
          2) /
          scale +
        1
      const raycaster = new Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(this.model[name].model.children, true)
      if (intersects.length <= 0) {
        return false
      }
      console.log('[当前点击的部件]:', intersects)
      // const selectObject = intersects[0].object as Mesh
      const selectObject = (intersects[0].object as SelectObject).ancestors
      if (selectObject) {
        const equipmentMaterial = equipmentMaterialMap.get(selectObject.name)
        if (equipmentMaterial) {
          if (
            equipment.value.name === selectObject.name &&
            outline.outlinePass.selectedObjects.length > 0
          ) {
            this.clearSelect(selectObject)
            return
          } else {
            equipment.value = selectObject
            outline.outlinePass.selectedObjects = [equipmentMaterial]
            equipmentMaterial.children.forEach((child: any) => {
              child.material.emissive.setHex(0x00ff00)
              child.material.emissiveIntensity = 0.5
            })
          }

          this.updateLabal(intersects[0])
        }
      } else {
        this.clearSelect(equipmentMaterialMap.get(equipment.value.name))
      }
    })
  }

  clearSelect(selectObject: any) {
    outline.outlinePass.selectedObjects = []
    turbineLabel.visible = false
    selectObject &&
      selectObject.children.forEach((mesh: any) => {
        mesh.material.emissive.setHex(mesh.currentHex)
      })
  }
  updateLabal(intersect: any) {
    turbineLabel.visible = !show.value
    const point = intersect.point
    turbineLabel.position.set(point.x, point.y, point.z)
  }
  createTurbineLabel(target: string) {
    const dom: HTMLElement = document.querySelector(target)!
    // dom.style.background = 'rgba(100,100,0,0.5)'
    turbineLabel = new CSS2DObject(dom)
    turbineLabel.name = 'turbineLabel'
    turbineLabel.scale.set(0.003, 0.003, 0.003)

    if (show.value) {
      turbineLabel.visible = true
    } else {
      turbineLabel.visible = false
    }
    dom.addEventListener('pointerdown', () => {
      console.log('label.element.addEventListener("click')
    })
    scene.add(turbineLabel)
    this.onPointerClick(ModelName.FACTORY)
  }
  createLabels() {
    htmlMeshCollection.forEach((obj) => {
      const mesh = scene.getObjectByName(obj.meshName)
      if (!mesh) return
      const dom: HTMLElement = document.querySelector(`#css2object-${obj.target}`)!
      if (!dom) return
      const csslabel = new CSS2DObject(dom)
      csslabel.name = obj.meshName

      // 把mesh局部坐标转换到世界坐标
      const worldPosition = new Vector3()
      mesh.getWorldPosition(worldPosition)
      csslabel.position.set(worldPosition.x, worldPosition.y, worldPosition.z)
      csslabel.scale.set(0.003, 0.003, 0.003)
      csslabel.visible = true
      turbineLabels.push(csslabel)
      scene.add(csslabel)
    })
  }
}
export { App, show, equipment, camera, TWEEN }
