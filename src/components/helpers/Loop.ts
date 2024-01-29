/*
 * @Author: zhou lei
 * @Date: 2024-01-29 17:26:42
 * @LastEditTime: 2024-01-29 17:30:37
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/Loop.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { Clock, type PerspectiveCamera, type Scene, type WebGLRenderer } from "three";
import type { UpdateTable } from "./update";
const clock = new Clock()
class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: UpdateTable[];
  constructor(camera:PerspectiveCamera, scene:Scene, renderer:WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }
  start(){
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }
  stop(){
    this.renderer.setAnimationLoop(null)
  }
  tick(){
    const delta = clock.getDelta()
    for (const object of this.updatables) {
      object.tick && object.tick(delta)
    }
  }
}
export { Loop }
