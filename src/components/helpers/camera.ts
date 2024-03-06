/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:24
 * @LastEditTime: 2024-03-05 14:13:07
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/camera.ts
 * 联系方式:910592680@qq.com
 */
import { PerspectiveCamera } from 'three'

const createCamera = () => {
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  // camera.position.set(0, 20, 0)
  camera.position.set(-9, 6, 9)
 
  // camera.up.set(0, 1, -1)
  return camera // 返回相机对象
}
export { createCamera }
