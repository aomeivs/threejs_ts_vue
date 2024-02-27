/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-02-27 14:37:38
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.ts
 * 联系方式:910592680@qq.com
 */
import { createCamera } from './components/helpers/camera'
import { createCSS2Renderer, createRenderer } from './components/helpers/renderer'
import { createScene } from './components/helpers/scene'
import { creatControls } from './components/helpers/controls'
import { createLights } from './components/helpers/lights'
import { Resizer } from './components/helpers/Resizer'
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
  WebGLRenderTarget,
  HalfFloatType,
  RGBAFormat
} from 'three'
// import { createCube } from './components/models/cube'
import { Loop } from './components/helpers/Loop'
import { loadAnimals, loadBackground } from './components/models/gltf/animal'
import { loadingManager } from './components/helpers/loadingManager'
// 调试工具
import Stats from 'three/examples/jsm/libs/stats.module.js'

import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { ModelEntity } from '@/components/models/gltf/animal'
import { createGUI } from './components/helpers/gui'
import { ref } from 'vue'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import {
  DotScreenShader,
  FXAAShader,
  GammaCorrectionShader,
  OutputPass,
  SMAAPass,
  ShaderPass,
  ViewHelper
} from 'three/examples/jsm/Addons.js'
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
let outline: { compose: EffectComposer; outlinePass: OutlinePass }
let count = 0
const equipmentMaterialMap = new Map()
const show = ref(false)
const equipment = ref<Equipment>({})

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
      createGUI(this)
    }

    // scene\camera\renderer\light\helper

    scene = createScene()
    camera = createCamera()
    renderer = createRenderer()
    cssRenderer = createCSS2Renderer()
    {
      const { ambientLight, directionalLights } = createLights()
      const axesHelper = new AxesHelper(5)
      const lightHelper: DirectionalLightHelper[] = []
      directionalLights.forEach((light) => {
        lightHelper.push(new DirectionalLightHelper(light, 0.2))
      })
      scene.add(ambientLight, ...directionalLights, axesHelper, ...lightHelper)
    }
    const viewHelper = new ViewHelper(camera, renderer.domElement)
    Object.assign(viewHelper, { tick: (delta: number) => viewHelper.update(delta) })
    const controls = creatControls(camera, cssRenderer.domElement)
    // 看向风车位置
    // controls.target.set(0, 1.5, 0)
    // 最好视角
    // controls.target.set(-3, 2, 2)
    controls.addEventListener('change', () => {
      count++
      if (count > 1) this.isOrbiting = true
    })
    container.appendChild(cssRenderer.domElement)
    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)
    loop = new Loop(camera, scene, renderer, cssRenderer, stats, viewHelper)
    outline = this.outline([])
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
      if (name == 'factory') {
        model.scale.multiplyScalar(0.03)
        scene.add(model)
      } else {
        model.scale.multiplyScalar(0.0003)
        // scene.add(model)
      }
      // equipment 材质设置以及部件存储
      // this.initEquipment()
      // turbine 材质设置
      // this.initTurbine()
      // factory 材质设置
      this.initFactory()
    })
    this.createTurbineLabel('#css2object')
    this.onPointerClick(ModelName.FACTORY)
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
          newMaterial.roughness = 0.7
          newMaterial.metalness = 0.5
        } else {
          newMaterial.roughness = 0.2
          newMaterial.metalness = 1
        }

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
      mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1
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

  // 为点击的模型添加 outlinepass 效果
  outline(
    selectedObjects: any,
    color: number = 0x15c5e8
  ): { compose: EffectComposer; outlinePass: OutlinePass } {
    const [w, h] = [window.innerWidth, window.innerHeight]
    const pixelRatio: number = 2
    const targetRenderer = new WebGLRenderTarget(w, h, {
      type: HalfFloatType,
      format: RGBAFormat
    })
    targetRenderer.samples = 8
    const compose = new EffectComposer(renderer, targetRenderer)
    const renderPass = new RenderPass(scene, camera)
    // renderPass.clear = false
    const outlinePass = new OutlinePass(new Vector2(w, h), scene, camera)
    const effectFXAA = new ShaderPass(FXAAShader)
    const effectSMAA = new SMAAPass(
      w * renderer.getPixelRatio() * pixelRatio,
      h * renderer.getPixelRatio() * pixelRatio
    )
    // const gammaPass = new ShaderPass(GammaCorrectionShader)
    // const dotScreenShader = new ShaderPass(DotScreenShader)
    // dotScreenShader.uniforms['scale'].value = 4
    effectFXAA.uniforms['resolution'].value.set(
      1 / (window.innerWidth * renderer.getPixelRatio() * pixelRatio),
      1 / (window.innerHeight * renderer.getPixelRatio() * pixelRatio)
    )
    const outputPass = new OutputPass()
    outlinePass.renderToScreen = true
    outlinePass.selectedObjects = selectedObjects
    compose.addPass(renderPass)
    compose.addPass(outlinePass)
    compose.addPass(outputPass)
    // 抗锯齿方式
    // compose.addPass(effectFXAA)
    compose.addPass(effectSMAA)
    // 伽马校正
    // compose.addPass(gammaPass)
    // compose.addPass(dotScreenShader)
    const params = {
      edgeStrength: 3,
      edgeGlow: 1,
      edgeThickness: 2,
      pulsePeriod: 1,
      usePatternTexture: false
    }
    outlinePass.edgeStrength = params.edgeStrength
    outlinePass.edgeGlow = params.edgeGlow
    outlinePass.visibleEdgeColor.set(color)
    outlinePass.hiddenEdgeColor.set(color)
    compose.setSize(w, h)
    compose.setPixelRatio(window.devicePixelRatio * pixelRatio)

    Object.assign(compose, {
      tick: (delta: number) => {
        compose.render(delta)
      }
    })

    return { compose, outlinePass }
  }
}
export { App, show, equipment }
