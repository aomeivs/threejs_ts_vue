/*
 * @Author: zhou lei
 * @Date: 2024-01-30 15:59:40
 * @LastEditTime: 2024-02-20 15:12:49
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/models/gltf/animal.ts
 * 联系方式:910592680@qq.com
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import turbine from '@/assets/3d-gltf-model/turbine.glb'
import equipment from '@/assets/3d-gltf-model/equipment.glb'
import factory from '@/assets/3d-gltf-model/factory.glb'
import { AnimationAction, AnimationClip, AnimationMixer, LoadingManager, Object3D } from 'three'
export type ModelEntity = { [key: string]: { model: Object3D; action?: AnimationClipExtends } }
const model: ModelEntity = {}
/**
 * 加载模型存储scene和action
 * @param loadManager
 * @returns
 */
const loadAnimals = async (loadManager?: LoadingManager): Promise<ModelEntity> => {
  const loader = new GLTFLoader(loadManager)
  const [animalData, equipmentData, factoryData] = await Promise.all([
    loader.loadAsync(turbine),
    loader.loadAsync(equipment),
    loader.loadAsync(factory)
  ])
  const turbineModel = setupModel(animalData, 'Anim_0')
  turbineModel.model.position.set(0, -1, 0)
  const equipmentModel = { model: equipmentData.scene }
  equipmentModel.model.position.set(0, -1, 0)
  const factoryModel = { model: factoryData.scene }
  factoryModel.model.position.set(0, 1, 0)
  
  model['turbine'] = turbineModel
  model['equipment'] = equipmentModel
  model['factory'] = factoryModel
  return model
}
export type AnimationClipExtends = AnimationAction & { name?: string }
/**
 * 模型动画控制
 * @param data
 * @param animalName 动画名称
 * @returns
 */
const setupModel = (data: any, animalName: string) => {
  const model = data.scene
  const clip = AnimationClip.findByName(data.animations, animalName)
  const mixer = new AnimationMixer(model)
  const action: AnimationClipExtends = mixer.clipAction(clip)
  action.name = animalName
  // action.play()
  model.tick = (delta: number) => {
    mixer.update(delta)
  }
  return { model, action }
}

export { loadAnimals }
