/*
 * @Author: zhou lei
 * @Date: 2024-01-29 11:04:58
 * @LastEditTime: 2024-03-08 13:20:04
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/lights.ts
 * 
 */
import { AmbientLight, DirectionalLight } from 'three'
const createLights = () => {
  const directionalLights: DirectionalLight[] = []
  const ambientLight = new AmbientLight(0xd9d9d9, 0.8)
  const lightArr = [
    [2, 8, 2],
    [-5, 5, 5],
    [-5, 5, -5]
  ]
  lightArr.forEach((item, index) => {
    const directionalLight = new DirectionalLight(0xffffff, .4)
    if (index === 0) {
      directionalLight.castShadow = true
      directionalLight.shadow.camera.left = -12
      directionalLight.shadow.camera.bottom = -14
      directionalLight.shadow.camera.top = 10
      directionalLight.shadow.camera.right = 14

    }
    directionalLight.position.set(item[0], item[1], item[2])
    directionalLights.push(directionalLight)
  })

  return { ambientLight, directionalLights }
}
export { createLights }
