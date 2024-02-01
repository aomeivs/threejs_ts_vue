/*
 * @Author: zhou lei
 * @Date: 2024-01-30 15:59:40
 * @LastEditTime: 2024-02-01 14:51:45
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/models/gltf/animal.ts
 * 联系方式:910592680@qq.com 
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import turbine from '@/assets/3d-gltf-model/turbine.glb'
import { AnimationAction, AnimationClip, AnimationMixer, LoadingManager, Object3D } from 'three'

const loadAnimals = async (
  loadManager?: LoadingManager
): Promise<{ scene: Object3D; action: AnimationAction }> => {
  const loader = new GLTFLoader(loadManager)
  const [animalData] = await Promise.all([loader.loadAsync(turbine)])
  const { scene, action } = setupModel(animalData, 'Anim_0')
  scene.position.set(0, -1, 0)
  return { scene, action }
}
/**
 * 模型动画控制
 * @param data
 * @param animalName 动画名称
 * @returns
 */
const setupModel = (data: any, animalName: string) => {
  const scene = data.scene
  // const model = scene.children[0]
  // const clip = data.animations[0]
  const clip = AnimationClip.findByName(data.animations, animalName)
  const mixer = new AnimationMixer(scene)
  const action = mixer.clipAction(clip)
  // action.play()
  scene.tick = (delta: number) => {
    mixer.update(delta)
  }
  return { scene, action }
}

export { loadAnimals }
