/*
 * @Author: zhou lei
 * @Date: 2024-01-30 15:59:40
 * @LastEditTime: 2024-03-20 16:52:09
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/models/gltf/animal.ts
 * 联系方式:910592680@qq.com
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import turbine from '@/assets/3d-gltf-model/turbine.glb'
// import equipment from '@/assets/3d-gltf-model/equipment_cc.glb'
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
export type ModelEntity = { [key: string]: { model: Object3D; action?: AnimationClipExtends } }
const model: ModelEntity = {}
/**
 * 加载模型存储scene和action
 * @param loadManager
 * @returns
 */
const loadAnimals = async (loadManager?: LoadingManager): Promise<ModelEntity> => {
  const loader = new GLTFLoader(loadManager)
  loader.setMeshoptDecoder(MeshoptDecoder)
  // const [animalData, equipmentData, factoryData] = await Promise.all([
  //   loader.loadAsync(turbine),
  //   loader.loadAsync(equipment),
  //   loader.loadAsync(factory)
  // ])
  const [factoryData] = await Promise.all([loader.loadAsync(factory)])
  // const turbineModel = setupModel(animalData, 'Anim_0')
  // turbineModel.model.position.set(0, -1, 0)
  // const equipmentModel = { model: equipmentData.scene }
  // equipmentModel.model.position.set(0, -1, 0)
  const factoryModel = { model: factoryData.scene }
  factoryModel.model.position.set(0, 0, 0)

  // model['turbine'] = turbineModel
  // model['equipment'] = equipmentModel
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
const loadBackground = async (scene: Scene) => {
  const rgbeLoader = new RGBELoader()
  const texture = await rgbeLoader.setDataType(HalfFloatType).loadAsync(sky)
  // scene.background = texture
  texture.mapping = EquirectangularReflectionMapping
  texture.colorSpace = 'srgb-linear'
  scene.environment = texture
  return texture
}

const loadArrow = async (position?: [x: number, y: number, z: number]) => {
  const texture = await new TextureLoader().loadAsync(arrowImg)
  // const material = new SpriteMaterial({ map: texture, color: 0xffff00 })
  // const arrow = new Sprite(material)
  const geometry = new PlaneGeometry(3, 1)
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
  textureAnimator(texture, 13, 1)
  return { arrow, texture }
}

const textureAnimator = (texture: Texture, tilesHoriz: number, tilesVert: number) => {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.repeat.set(1 / tilesHoriz, 1 / tilesVert)
  // 当前帧
  let currentTile = 0

  Object.assign(texture, {
    tick: () => {
      currentTile++
      const currentColumn = currentTile % tilesHoriz
      texture.offset.x = currentColumn / tilesHoriz
    }
  })
}
export { loadAnimals, loadBackground, loadArrow, textureAnimator }
