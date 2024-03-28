/*
 * @Author: zhou lei
 * @Date: 2024-03-28 14:42:06
 * @LastEditTime: 2024-03-28 16:37:27
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/effect/exploder.ts
 */
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
  modelObject.traverse(function (value: any) {
    if (value.isMark || value.isMarkChild || value.isLine || value.isSprite) return
    if (value.isMesh) {
      meshBox.setFromObject(value)

      const meshCenter = getWorldCenterPosition(meshBox)
      // 爆炸方向
      value.userData.worldDir = new Vector3().subVectors(meshCenter, explodeCenter).normalize()
      // 爆炸距离 mesh中心点到爆炸中心点的距离
      value.userData.worldDistance = new Vector3().subVectors(meshCenter, explodeCenter)
      // 原始坐标
      value.userData.originPosition = value.getWorldPosition(new Vector3())
      // mesh中心点
      value.userData.meshCenter = meshCenter.clone()
      value.userData.explodeCenter = explodeCenter.clone()
    }
  })
}

const getWorldCenterPosition = (box: Box3, scalar = 0.5): Vector3 => {
  return new Vector3().addVectors(box.max, box.min).multiplyScalar(scalar)
}

const explodeModel = (model: Object3D, scalar: number) => {
  model.traverse(function (value) {
    // @ts-ignore
    if (!value.isMesh || !value.userData.originPosition) return
    const distance = value.userData.worldDir
      .clone()
      .multiplyScalar(value.userData.worldDistance.length() * scalar)
    const offset = new Vector3().subVectors(
      value.userData.meshCenter,
      value.userData.originPosition
    )
    const center = value.userData.explodeCenter
    const newPos = new Vector3().copy(center).add(distance).sub(offset)
    const localPosition = value.parent?.worldToLocal(newPos.clone())
    localPosition && value.position.copy(localPosition)
  })
}

export { initExplodeModel, explodeModel }
