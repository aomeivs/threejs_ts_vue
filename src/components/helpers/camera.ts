/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:24
 * @LastEditTime: 2024-03-06 17:03:47
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/camera.ts
 * 联系方式:910592680@qq.com
 */
import { PerspectiveCamera } from 'three'

const createCamera = (container?: HTMLElement) => {
  const w = container&&container.clientWidth||window.innerWidth
  const h = container&&container.clientHeight||window.innerHeight
  const camera = new PerspectiveCamera(45, w / h, 0.1, 1000)
  // camera.position.set(0, 20, 0)
  camera.position.set(-9, 6, 9)

  // camera.up.set(0, 1, -1)
  return camera // 返回相机对象
}
export { createCamera }
