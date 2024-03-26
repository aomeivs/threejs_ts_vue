/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:24
 * @LastEditTime: 2024-03-26 10:40:18
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/camera.ts
 *
 */
import { OrthographicCamera, PerspectiveCamera } from 'three'

const createCamera = (container?: HTMLElement) => {
  const w = (container && container.clientWidth) || window.innerWidth
  const h = (container && container.clientHeight) || window.innerHeight

  const camera = new PerspectiveCamera(45, w / h, 0.1, 1000)
  // const camera = new OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0.1, 1000)
  // camera.position.set(0, 20, 0)
  // camera.position.set(-9, 6, 9)
  camera.position.set(0, 13, 9)
  return camera // 返回相机对象
}
export { createCamera }
