/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:57:00
 * @LastEditTime: 2024-02-27 11:13:47
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/renderer.ts
 * 联系方式:910592680@qq.com
 */
import { WebGLRenderer } from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.autoClear = false
  renderer.setClearColor(0x000000, 0);
  return renderer
}
const createCSS2Renderer = () => {
  const renderer = new CSS2DRenderer()
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0px'
  return renderer
}
export { createRenderer, createCSS2Renderer }
