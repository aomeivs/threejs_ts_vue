/*
 * @Author: zhou lei
 * @Date: 2024-01-29 11:04:58
 * @LastEditTime: 2024-01-29 11:06:08
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/lights.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { AmbientLight, DirectionalLight } from 'three'

const createLights = () => {
  const ambientLight = new AmbientLight(0xffffff, 0.5)
  const directionalLight = new DirectionalLight(0xffffff, 0.5)

  return { ambientLight, directionalLight }
}
export { createLights }
