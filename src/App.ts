/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-03-08 13:58:52
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.ts
 * 联系方式:910592680@qq.com
 */
import { createCamera } from './components/helpers/camera'
import { createCSS2Renderer, createRenderer } from './components/helpers/renderer'
import { createScene } from './components/helpers/scene'
import { creatControls } from './components/helpers/controls'
import { createLights } from './components/helpers/lights'
import { Resizer, updatables } from './components/helpers/Resizer'
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
  CameraHelper
} from 'three'
// import { createCube } from './components/models/cube'
import { Loop } from './components/helpers/Loop'
import { loadAnimals, loadArrow, loadBackground } from './components/models/gltf/animal'
import { loadingManager } from './components/helpers/loadingManager'
// 调试工具
import Stats from 'three/examples/jsm/libs/stats.module.js'

import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { ModelEntity } from '@/components/models/gltf/animal'
import { createGUI } from './components/helpers/gui'
import { ref } from 'vue'
import { ViewHelper } from 'three/examples/jsm/Addons.js'
import useEffectHooks, { type OutlineEffectType } from './components/effect/outline'
export type Equipment = {
  name?: string
}
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let cssRenderer: CSS2DRenderer
let scene: Scene
let loop: Loop
let stats: Stats
let turbineLabel: any
let outline: OutlineEffectType
let count = 0
let w = 0
let h = 0
const equipmentMaterialMap = new Map()
const show = ref(false)
const equipment = ref<Equipment>({})
export type HtmlMeshCollection = { target: string; meshName: string }
//  声明一个 EnumerationModelType
enum ModelName {
  /**
   * 工厂模型
   */
  FACTORY = 'factory',
  /**
   * 风车
   */
  TURBINE = 'turbine',
  /**
   * 设备
   */
  EQUIPMENT = 'equipment'
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
      createGUI(this) //.hide()
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
        if (index === 0) {
          const cameraHelper = new CameraHelper(light.shadow.camera)
          lightHelper.push(new DirectionalLightHelper(light, 0.2))

          scene.add(cameraHelper)
        }
      })
      scene.add(ambientLight, ...directionalLights, axesHelper, ...lightHelper)
    }
    const viewHelper = new ViewHelper(camera, renderer.domElement)
    Object.assign(viewHelper, { tick: (delta: number) => viewHelper.update(delta) })
    const controls = creatControls(camera, cssRenderer.domElement)
    // 看向风车位置
    // controls.target.set(0, 1.5, 0)
    // 最好视角
    controls.target.set(1, -1, 1)
    controls.addEventListener('change', () => {
      // console.log('change', camera.position, controls.target, camera.quaternion)
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
        model.position.set(0, -1, 0)
        scene.add(model)
        // factory 材质设置
        this.initFactory()
      } else {
        model.scale.multiplyScalar(0.001)
        scene.add(model)
        // equipment 材质设置以及部件存储
        this.initEquipment()
        // turbine 材质设置
        this.initTurbine()
      }
    })
    this.createTurbineLabel('#css2object')
    this.onPointerClick(ModelName.FACTORY)
    /**
     * 加载箭头
     */
    this.createArrow()
  }
  async createArrow() {
    const pointName = ['支架盖045', '支架盖042', '支架盖039', '支架盖024']
    const positions = pointName.map((name) => {
      const worldPosition = new Vector3()
      const mesh = scene.getObjectByName(name)!
      mesh.getWorldPosition(worldPosition)
      // mesh.visible = false
      return worldPosition
    })
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i].toArray()
      pos[1] = pos[1] + .2
      const { arrow, texture } = await loadArrow(pos)
      arrow.name = 'arrow'
      arrow.scale.multiplyScalar(0.3)
      arrow.rotation.set(0, Math.PI, 0)
      arrow.material.emissive.setHex(0x00ff00)
      loop.updatables.push(texture)
      scene.add(arrow)
    }

    // const { arrow, texture } = await loadArrow([
    //   -1.3, 1.1, -2
    // ])
    // arrow.name = 'arrow'
    // arrow.scale.multiplyScalar(0.3)
    // arrow.rotation.set(0, Math.PI, 0)
    // arrow.material.emissive.setHex(0x00ff00)

    // loop.updatables.push(texture)
    // scene.add(arrow)
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
        equipmentMaterialMap.set(meshChild.name, meshChild) // Map 存储各个部件
      }
    })
  }

  // render() {
  //   renderer.render(scene, camera)
  // }
  start() {
    loop.start()
    this.showLineHTML()
    updatables.push(this.showLineHTML.bind(this))
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
  showLineHTML() {
    document.querySelector('#svgContainer')?.remove()

    // '#line1', '#line3', '#line4'
    this.createLineSVG([
      {
        target: '#line1',
        meshName: '支架盖045'
      },
      {
        target: '#line2',
        meshName: '支架盖1'
      },
      {
        target: '#line3',
        meshName: '支架盖024'
      }
    ])
  }

  createLineSVG(targets: HtmlMeshCollection[]) {
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
      // const geometry = new BoxGeometry()
      // const material = new MeshBasicMaterial({ color: 0x00ff00 })
      // const mesh = new Mesh(geometry, material)
      // scene.add(mesh)
      const element = document.querySelector(item.target)!
      if (!element) return
      const targetRect = element.getBoundingClientRect()
      const svgLine = document.createElementNS(svgNS, 'path')
      svgLine.setAttribute('class', 'pathshadow')
      svgLine.setAttribute('stroke', 'rgb(0, 148, 253)')
      svgLine.setAttribute('stroke-width', '2.5')
      svgLine.setAttribute('fill', 'none')
      svgContainer.appendChild(svgLine)
      Object.assign(mesh, {
        tick: () => {
          // Convert Mesh position to screen coordinates
          const meshPosition = new Vector3()
          meshPosition.setFromMatrixPosition(mesh.matrixWorld)
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
          // const path = `M ${screenX} ${screenY} L ${targetX} ${targetY}`
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
    document.addEventListener('click', (event: MouseEvent) => {
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
      const selectMesh = intersects[0].object as Mesh
      if (selectMesh?.isMesh) {
        const equipmentMaterial = equipmentMaterialMap.get(selectMesh.name)
        equipment.value = selectMesh
        // currentEquipment.value.name = selectMesh.name
        if (equipmentMaterial) {
          this.model[name].model.traverse((child: any) => {
            if (child.isMesh) {
              if (equipmentMaterial.name !== child.name) {
                child.material.emissive.setHex(child.currentHex)
              } else {
                outline.outlinePass.selectedObjects = [child]
                if (equipmentMaterial.material.emissive.getHex() == equipmentMaterial.currentHex) {
                  // equipmentMaterial.material.emissive.setHex(1)
                  equipmentMaterial.material.emissive.setHex(0x00ff00)
                  show.value = false
                } else {
                  equipmentMaterial.material.emissive.setHex(equipmentMaterial.currentHex)
                  outline.outlinePass.selectedObjects = []
                  show.value = true
                }
              }
            }
          })
          console.log('[当前点击的部件]:', intersects)

          this.updateLabal(intersects[0])
        }
      }
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
  }
}
export { App, show, equipment }
