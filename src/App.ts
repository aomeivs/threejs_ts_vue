/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-02-01 14:53:13
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/app.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { createCamera } from './components/helpers/camera'
import { createRenderer } from './components/helpers/renderer'
import { createScene } from './components/helpers/scene'
import { creatControls } from './components/helpers/controls'
import { createLights } from './components/helpers/lights'
import { Resizer } from './components/helpers/Resizer'
import { type AnimationAction, type PerspectiveCamera, type Scene, type WebGLRenderer } from 'three'
// import { createCube } from './components/models/cube'
import { Loop } from './components/helpers/Loop'
import { loadAnimals } from './components/models/gltf/animal'
import { loadingManager } from './components/helpers/loadingManager'
let camera: PerspectiveCamera
let renderer: WebGLRenderer
let scene: Scene
let loop: Loop

class App {
  actions: { [key: string]: AnimationAction }
  constructor(container: HTMLElement) {
    this.actions = {}
    camera = createCamera()
    camera.position.set(-2, 4, 6)
    renderer = createRenderer()
    scene = createScene()
    loop = new Loop(camera, scene, renderer)
    container.appendChild(renderer.domElement)
    const controls = creatControls(camera, renderer.domElement)
    const { ambientLight, directionalLight } = createLights()
    // const cube = createCube()
    directionalLight.position.set(2, -2, 2)
    new Resizer(container, camera, renderer)
    scene.add(ambientLight, directionalLight)
    loop.updatables.push(controls)
  }
  async init() {
    const { scene: animalScene, action } = await loadAnimals(loadingManager)
    this.actions['Anim_0'] = action
    animalScene.scale.multiplyScalar(0.0003)
    loop.updatables.push(animalScene)
    scene.add(animalScene)
  }
  render() {
    renderer.render(scene, camera)
  }
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
  stop() {
    loop.stop()
  }
}
export { App }
