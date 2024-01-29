/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:24
 * @LastEditTime: 2024-01-29 11:02:24
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/camera.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { PerspectiveCamera } from 'three'

const createCamera = () => {
  const camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 10)
  return camera // 返回相机对象
}
export { createCamera }
