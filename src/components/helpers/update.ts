/*
 * @Author: zhou lei
 * @Date: 2024-01-29 13:11:12
 * @LastEditTime: 2024-02-01 17:39:36
 * @LastEditors: Do not edit
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/update.ts
 * 
 */
import { Clock, Object3D } from 'three'
export type UpdateTable = Object3D & { tick?: (delta: number) => void } & any

const clock = new Clock()
const update = (updatables: UpdateTable[]) => {
  const delta = clock.getDelta()
  for (const object of updatables) {
    object.tick && object.tick(delta)
  }
}
export { update }
