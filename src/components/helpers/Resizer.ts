/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:57:11
 * @LastEditTime: 2024-01-29 13:18:44
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/Resizer.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import type { PerspectiveCamera, WebGLRenderer } from 'three'

const setSize = (container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
  constructor(container: HTMLElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    setSize(container, camera, renderer)
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer)
    })
  }
}
export { Resizer }
