/*
 * @Author: zhou lei
 * @Date: 2024-01-29 17:26:42
 * @LastEditTime: 2024-03-26 13:07:10
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/Loop.ts
 *
 */
import { Clock, type PerspectiveCamera, type Scene, type WebGLRenderer } from 'three'
import type { UpdateTable } from './update'
import type { CSS2DRenderer, ViewHelper } from 'three/examples/jsm/Addons.js'
const clock = new Clock()
class Loop {
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGLRenderer
  cssRenderer: CSS2DRenderer
  stats: Stats
  viewHelper: ViewHelper
  updatables: UpdateTable[] = []
  // 移除更新列表
  removeUpdateables: UpdateTable[] = []
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
    cssRenderer: CSS2DRenderer,
    stats: Stats,
    viewHelper: ViewHelper //坐标系辅助
  ) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.cssRenderer = cssRenderer
    this.stats = stats
    this.viewHelper = viewHelper
  }
  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      // 使用了compse renderer，不需要渲染
      // this.renderer.render(this.scene, this.camera)
      // this.renderer.autoClear = false
      this.cssRenderer.render(this.scene, this.camera) //使用camera渲染scene。
      this.viewHelper.render(this.renderer)

      this.stats.update() //这是什么方法，什么作用
    })
  }
  remove(name: string) {
    const index = this.updatables.findIndex((item) => item.name === name)
    if (index > -1) {
      this.removeUpdateables.push(this.updatables.splice(index, 1)[0])
    }
  }
  resume(name: string) {
    const index = this.removeUpdateables.findIndex((item) => item.name === name)
    if (index > -1) {
      this.updatables.push(this.removeUpdateables.splice(index, 1)[0])
    }
  }
  stop() {
    this.renderer.setAnimationLoop(null) //每个可用帧都会调用的函数。 如果传入‘null’,所有正在进行的动画都会停止。
  }
  //loop.updatables通过push添加了许多对象，而对象里有tick方法
  tick() {
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      object && object.tick && object.tick(delta)
      object && object.update && object.update()
    }
  }
}
export { Loop }
