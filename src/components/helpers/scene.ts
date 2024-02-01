/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:42
 * @LastEditTime: 2024-01-29 14:47:56
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/scene.ts
 * 联系方式:910592680@qq.com 
 */
import { Color, Scene } from 'three'

const createScene = (color: number = 0x999999) => {
  const scene = new Scene()
  scene.background = new Color(color)
  return scene
}
export { createScene }
