/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:56:42
 * @LastEditTime: 2024-03-06 16:37:28
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/scene.ts
 * 联系方式:910592680@qq.com 
 */
import { Color, Scene } from 'three'

const createScene = (color: number = 0x333333) => {
  const scene = new Scene()
  scene.background = new Color(color)
  // scene 设置透明
  scene.background = null
  return scene
}
export { createScene }
