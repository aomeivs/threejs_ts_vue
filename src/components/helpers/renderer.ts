/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:57:00
 * @LastEditTime: 2024-03-18 13:48:42
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/renderer.ts
 * 
 */
import { PCFSoftShadowMap, WebGLRenderer } from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const createRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true,
    powerPreference: 'high-performance'
  })
  renderer.autoClear = false
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  // renderer.setPixelRatio(4)
  // renderer.outputColorSpace = 'srgb-linear'
  renderer.setClearColor(0x000000, 0)
  return renderer
}
const createCSS2Renderer = () => {
  const renderer = new CSS2DRenderer()
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0px'
  return renderer
}
export { createRenderer, createCSS2Renderer }
