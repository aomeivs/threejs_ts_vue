/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-01-31 15:22:44
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
import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { createCube } from './components/models/cube'
import { Loop } from './components/helpers/Loop'
import { loadAnimals } from './components/models/gltf/animal'

let camera: PerspectiveCamera
let renderer: WebGLRenderer
let scene: Scene
let loop: Loop
class App {
  constructor(container: HTMLElement) {
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
    const { animalScene } = await loadAnimals()
    // console.log(animalScene.children[0])
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
  stop() {
    loop.stop()
  }
}
export { App }
