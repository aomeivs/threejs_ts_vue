/*
 * @Author: zhou lei
 * @Date: 2024-01-30 15:59:40
 * @LastEditTime: 2024-03-26 15:01:25
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/models/gltf/animal.ts
 
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import turbine from '@/assets/3d-gltf-model/turbine.glb'
import equipment from '@/assets/3d-gltf-model/equipment.glb'
import factory from '@/assets/3d-gltf-model/factory.glb'
import sky from '@/assets/hdr/kloppenheim_05_puresky_1k.hdr'
import arrowImg from '@/assets/arror.webp'
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  DoubleSide,
  EquirectangularReflectionMapping,
  HalfFloatType,
  LoadingManager,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  Texture,
  TextureLoader
} from 'three'
import { RGBELoader } from 'three/examples/jsm/Addons.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { ModelName } from '@/App'
export type ModelParsed = { model: Object3D; action?: AnimationClipExtends }
export type ModelEntity = {
  [key in ModelName]?: ModelParsed
}

const model: ModelEntity = {}
/**
 * 加载模型存储scene和action
 * @param loadManager
 * @returns
 */
const loadModel = async (loadManager?: LoadingManager): Promise<ModelEntity> => {
  const loader = new GLTFLoader(loadManager)
  loader.setMeshoptDecoder(MeshoptDecoder)

  const turbineData = await loader.loadAsync(turbine)
  const equipmentData = await loader.loadAsync(equipment)
  const factoryData = await loader.loadAsync(factory)

  const turbineModel = setupModel(turbineData, 'Anim_0')
  turbineModel.model.position.set(0, -3, 0)
  const equipmentModel = { model: equipmentData.scene }
  equipmentModel.model.position.set(0, -3, 0)
  const factoryModel = { model: factoryData.scene }
  factoryModel.model.position.set(0, 0, 0)

  model[ModelName.TURBINE] = turbineModel
  model[ModelName.EQUIPMENT] = equipmentModel
  model[ModelName.FACTORY] = factoryModel
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
const loadBackground = async (scene: Scene) => {
  const rgbeLoader = new RGBELoader()
  const texture = await rgbeLoader.setDataType(HalfFloatType).loadAsync(sky)
  // scene.background = texture
  texture.mapping = EquirectangularReflectionMapping
  // texture.colorSpace = 'srgb-linear'
  scene.environment = texture
  return texture
}

const loadArrow = async (position?: [x: number, y: number, z: number]) => {
  const texture = await new TextureLoader().loadAsync(arrowImg)
  // const material = new SpriteMaterial({ map: texture, color: 0xffff00 })
  // const arrow = new Sprite(material)
  // const textureWidth = 28 texture.repeat 需要缩放对应比例
  const geometry = new PlaneGeometry(4, 1)
  const material = new MeshStandardMaterial({
    map: texture,
    transparent: true, // 开启透明
    side: DoubleSide //两面可见
  })
  const arrow = new Mesh(geometry, material)

  if (position) {
    const [x, y, z] = position
    arrow.position.set(x, y, z)
  }
  textureAnimator(texture, 7, 1)
  return { arrow, texture }
}

const textureAnimator = (texture: Texture, tilesHoriz: number, tilesVert: number) => {
  // U阵列重复
  texture.wrapS = RepeatWrapping
  // 铺满纹理需要重复的次数
  texture.repeat.set(1 / tilesHoriz, 1 / tilesVert)
  // 当前帧
  let currentTile = 0
  Object.assign(texture, {
    tick: (delta: number) => {
      currentTile = currentTile + delta
      // 每帧移动的距离
      texture.offset.x = currentTile / tilesHoriz
    }
  })
}
export { loadModel, loadBackground, loadArrow, textureAnimator }
