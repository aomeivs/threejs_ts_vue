/*
 * @Author: zhou lei
 * @Date: 2024-03-28 14:42:06
 * @LastEditTime: 2024-03-29 16:43:08
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/effect/exploder.ts
 */
import * as TWEEN from '@tweenjs/tween.js'
import { Object3D, Box3, Vector3 } from 'three'

// 初始化爆炸数据保存到每个mesh的userdata上
const initExplodeModel = (modelObject: Object3D) => {
  if (!modelObject) return

  // 计算模型中心
  const explodeBox = new Box3()
  explodeBox.setFromObject(modelObject)
  const explodeCenter = getWorldCenterPosition(explodeBox)

  const meshBox = new Box3()

  // 遍历整个模型，保存数据到userData上，以便爆炸函数使用
  modelObject.traverse(function (child: any) {
    if (child.isMesh) {
      meshBox.setFromObject(child)

      const meshCenter = getWorldCenterPosition(meshBox)
      // 爆炸方向
      child.userData.worldDir = new Vector3().subVectors(meshCenter, explodeCenter).normalize()
      // 爆炸距离 mesh中心点到爆炸中心点的距离
      child.userData.worldDistance = new Vector3().subVectors(meshCenter, explodeCenter)
      // 原始坐标
      child.userData.originPosition = child.getWorldPosition(new Vector3())
      // mesh中心点
      child.userData.meshCenter = meshCenter.clone()
      child.userData.explodeCenter = explodeCenter.clone()
    }
  })
}
/**
 * 返回mesh中心点：通过将框的最大和最小角向量相加，然后乘以一个标量值
 * @param box 
 * @returns 
 */
const getWorldCenterPosition = (box: Box3): Vector3 => {
  return box.getCenter(new Vector3())
}

const explodeModel = (model: Object3D, scalar: number) => {
  model.traverse((child: any) => {
    if (!child.isMesh || !child.userData.originPosition) return
    const distance = child.userData.worldDir
      .clone()
      .multiplyScalar(child.userData.worldDistance.length() * scalar)
    const offset = new Vector3().subVectors(
      child.userData.meshCenter,
      child.userData.originPosition
    )
    const center = child.userData.explodeCenter
    const newPos = new Vector3().copy(center).add(distance).sub(offset)
    const localPosition = child.parent?.worldToLocal(newPos.clone())
    if (localPosition) {
      // child.position.copy(localPosition)
      new TWEEN.Tween(child.position).to(localPosition, 800).start()
    }
  })
}

export { initExplodeModel, explodeModel }
