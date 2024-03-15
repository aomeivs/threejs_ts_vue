/*
 * @Author: zhou lei
 * @Date: 2024-01-29 11:06:34
 * @LastEditTime: 2024-03-08 14:08:24
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/controls.ts
 * 联系方式:910592680@qq.com
 */
import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export type ExtendedOrbitControls = OrbitControls & {
  tick?: () => void
}
const creatControls = (camera: PerspectiveCamera, canvas: HTMLElement) => {
  const cameraControls: ExtendedOrbitControls = new OrbitControls(camera, canvas)
  // enableDamping 开启了listener change后
  {
    // cameraControls.enableDamping = true
    // cameraControls.dampingFactor = 0.1
  }
  cameraControls.maxPolarAngle = Math.PI / 2
  // 缩放范围
  cameraControls.minDistance = cameraControls.getDistance() / 1.2
  cameraControls.maxDistance = cameraControls.getDistance() * 1.2

  cameraControls.tick = () => {
    cameraControls.update()
  }
  return cameraControls
}
export { creatControls }
