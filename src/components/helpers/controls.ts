/*
 * @Author: zhou lei
 * @Date: 2024-01-29 11:06:34
 * @LastEditTime: 2024-01-29 14:50:56
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/controls.ts
 * 联系方式:910592680@qq.com 
 */
import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export type ExtendedOrbitControls = OrbitControls & {
  tick?: () => void
}
const creatControls = (camera: PerspectiveCamera, canvas: HTMLCanvasElement) => {
  const cameraControls: ExtendedOrbitControls = new OrbitControls(camera, canvas)
  cameraControls.enableDamping = true
  cameraControls.tick = () => cameraControls.update()
  return cameraControls
}
export { creatControls }
