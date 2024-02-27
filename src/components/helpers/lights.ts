/*
 * @Author: zhou lei
 * @Date: 2024-01-29 11:04:58
 * @LastEditTime: 2024-02-27 10:14:36
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/lights.ts
 * 联系方式:910592680@qq.com
 */
import { AmbientLight, DirectionalLight } from 'three'
const createLights = () => {
  const directionalLights: DirectionalLight[] = []
  const ambientLight = new AmbientLight(0xffffff, .3)
  const lightArr = [
    [10, 10, 10],
    [-10, 10, 10],
    [-10, 10, -10]
  ]
  lightArr.forEach((item) => {
    const directionalLight = new DirectionalLight(0xffffff, .8)
    directionalLight.position.set(item[0], item[1], item[2])
    directionalLights.push(directionalLight)
  })

  return { ambientLight, directionalLights }
}
export { createLights }
