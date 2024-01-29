/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:51:21
 * @LastEditTime: 2024-01-29 14:51:45
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
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { update, type UpdateTable } from './components/helpers/update'
import { createCube } from './components/models/cube'

let camera: PerspectiveCamera
let renderer: WebGLRenderer
let scene: Scene
const updatables: UpdateTable[] = []
class App {
  constructor(container: HTMLElement) {
    camera = createCamera()
    renderer = createRenderer()
    scene = createScene()
    container.appendChild(renderer.domElement)
    const controls = creatControls(camera, renderer.domElement)
    const { ambientLight, directionalLight } = createLights()
    const cube = createCube()
    new Resizer(container, camera, renderer)
    scene.add(ambientLight, directionalLight, cube)
    updatables.push(controls)
  }
  render() {
    renderer.render(scene, camera)
  }
  start() {
    renderer.setAnimationLoop(() => {
      update(updatables)
      this.render()
    })
  }
}
export { App }
