/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:57:11
 * @LastEditTime: 2024-02-01 17:56:37
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/Resizer.ts
 * 联系方式:910592680@qq.com
 */
import type { PerspectiveCamera, WebGLRenderer } from 'three'
import type { CSS2DRenderer } from 'three/examples/jsm/Addons.js'

const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  cssRenderer: CSS2DRenderer
) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  cssRenderer.setSize(container.clientWidth, container.clientHeight)
  cssRenderer.domElement.style.position = 'absolute'
  cssRenderer.domElement.style.top = '0'
  cssRenderer.domElement.style.pointerEvents='none'
  renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    cssRenderer: CSS2DRenderer
  ) {
    setSize(container, camera, renderer, cssRenderer)
    window.addEventListener('resize', () => {
      // set the size again if a resize occurs
      setSize(container, camera, renderer, cssRenderer)
    })
  }
}
export { Resizer }
