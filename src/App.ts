/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-02-20 14:14:04
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
  MeshStandardMaterial
} from 'three'
// import { createCube } from './components/models/cube'
import { Loop } from './components/helpers/Loop'
import { loadAnimals } from './components/models/gltf/animal'
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
import { FXAAShader, GammaCorrectionShader, OutputPass, SMAAPass, ShaderPass } from 'three/examples/jsm/Addons.js'
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
const equipmentMaterialMap = new Map()
const show = ref(false)
const equipment = ref<Equipment>({})
class App {
  actions: { [key: string]: AnimationAction }
  model: ModelEntity
  container: HTMLElement
  constructor(container: HTMLElement) {
    this.container = container
    this.actions = {}
    this.model = {}
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

    const controls = creatControls(camera, cssRenderer.domElement)
    controls.target.set(0, 1.5, 0)
    container.appendChild(cssRenderer.domElement)
    container.appendChild(renderer.domElement)
    container.appendChild(stats.dom)
    loop = new Loop(camera, scene, renderer, cssRenderer, stats)
    outline = this.outline([])
    loop.updatables.push(controls, outline.compose)

    // 响应式renderer
    {
      new Resizer(container, camera, renderer, cssRenderer,outline.compose)
    }
  }
  async init() {
    // const { scene: animalScene, action } = await loadAnimals(loadingManager)
    this.model = await loadAnimals(loadingManager)
    Object.values(this.model).forEach((data) => {
      const { model, action } = data
      if (action) {
        this.actions[action.name!] = action
        loop.updatables.push(model)
      }
      // 模型同步缩放合适尺寸
      model.scale.multiplyScalar(0.0003)
      scene.add(model)
      // equipment 材质设置以及部件存储
      this.model.equipment.model.traverse((child: any) => {
        const meshChild = child as Mesh & {
          currentHex?: number
        }
        if (meshChild.isMesh) {
          const newMaterial = (meshChild.material as MeshStandardMaterial).clone()
          meshChild.currentHex = newMaterial.emissive.getHex()
          newMaterial.roughness = 0.5
          newMaterial.metalness = 0.8
          meshChild.material = newMaterial
          equipmentMaterialMap.set(meshChild.name, meshChild) // Map 存储各个部件
        }
      })
      // turbine 材质设置
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
        }
      })
    })
    this.createTurbineLabel('#css2object')
    this.onPointerClick()
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
  onPointerClick() {
    document.addEventListener('click', (event: MouseEvent) => {
      const mouse = new Vector2()
      mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1
      const raycaster = new Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(this.model.equipment.model.children, true)
      if (intersects.length <= 0) {
        return false
      }
      const selectMesh = intersects[0].object as Mesh
      if (selectMesh?.isMesh) {
        const equipmentMaterial = equipmentMaterialMap.get(selectMesh.name)
        equipment.value = selectMesh
        // currentEquipment.value.name = selectMesh.name
        if (equipmentMaterial) {
          this.model.equipment.model.traverse((child: any) => {
            if (child.isMesh) {
              if (equipmentMaterial.name !== child.name) {
                child.material.emissive.setHex(child.currentHex)
              } else {
                outline.outlinePass.selectedObjects = [child]
                if (equipmentMaterial.material.emissive.getHex() == equipmentMaterial.currentHex) {
                  equipmentMaterial.material.emissive.setHex(1)
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
    dom.style.background = 'rgba(100,100,0,0.5)'
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
    const compose = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    const outlinePass = new OutlinePass(new Vector2(w, h), scene, camera)
    const effectFXAA = new ShaderPass(FXAAShader)
    const effectSMAA = new SMAAPass(w * renderer.getPixelRatio(), h * renderer.getPixelRatio())
    const gammaPass = new ShaderPass(GammaCorrectionShader)
    effectFXAA.uniforms['resolution'].value.set(
      1 / (window.innerWidth * renderer.getPixelRatio()),
      1 / (window.innerHeight * renderer.getPixelRatio())
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
    compose.addPass(gammaPass)
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
    compose.setPixelRatio(window.devicePixelRatio)

    Object.assign(compose, {
      tick: (delta: number) => {
        compose.render(delta)
      }
    })

    return { compose, outlinePass }
  }
}
export { App, show, equipment }
