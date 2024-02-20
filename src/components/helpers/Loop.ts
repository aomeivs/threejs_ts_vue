/*
 * @Author: zhou lei
 * @Date: 2024-01-29 17:26:42
 * @LastEditTime: 2024-02-20 16:56:09
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/Loop.ts
 * 联系方式:910592680@qq.com
 */
import { Clock, type PerspectiveCamera, type Scene, type WebGLRenderer } from 'three'
import type { UpdateTable } from './update'
import type { CSS2DRenderer } from 'three/examples/jsm/Addons.js'
const clock = new Clock()
class Loop {
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGLRenderer
  cssRenderer: CSS2DRenderer
  stats: Stats
  updatables: UpdateTable[]
  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
    cssRenderer: CSS2DRenderer,
    stats: Stats
  ) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.cssRenderer = cssRenderer
    this.stats = stats
    this.updatables = []
  }
  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      // 使用了compse renderer的话，这里不需要渲染
      this.renderer.render(this.scene, this.camera)
      this.cssRenderer.render(this.scene, this.camera)
      this.stats.update()
    })
  }
  stop() {
    this.renderer.setAnimationLoop(null)
  }
  tick() {
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      object.tick && object.tick(delta)
    }
  }
}
export { Loop }
