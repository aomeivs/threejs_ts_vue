import {
  OrthographicCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  MathUtils,
  type Scene,
  Object3D,
  ACESFilmicToneMapping
} from 'three'

type miniMapOptions = Partial<{
  scene: Scene
  target: any
  mapSize: number
  mapRenderSize: number
  mapRotateZ: number
  mapSyncRotateZ: boolean
  container: HTMLElement
}>
let miniMapRenderer: WebGLRenderer
let miniMapDomEl: HTMLElement
let miniMapCamera: OrthographicCamera

export class MiniMap {
  miniMapCamera = null
  scene: Scene
  mapSize: number
  mapRenderSize: number
  mapSyncRotateZ: boolean
  mapRotateZ: number
  followTarget: Object3D
  container: HTMLElement
  /**
   * 初始化参数
   * @param {Object} options
   * @options.scene 主场景
   * @options.target 小地图中心点的3D目标
   * @options.mapSize 摄像机看到的内容大小，默认10
   * @options.mapRenderSize 小地图2D平面的大小，默认120
   * @options.mapRotateZ number 小地图沿着Z轴（垂直屏幕）旋转角度，默认0
   * @options.mapSyncRotateZ boolean 小地图沿着Z轴（垂直屏幕）是否跟着一同target旋转，默认false
   */
  constructor(options: miniMapOptions) {
    this.scene = options.scene!
    this.mapSize = options.mapSize || 3
    this.mapRenderSize = options.mapRenderSize || 120
    this.mapRotateZ = options.mapRotateZ || 0
    this.mapSyncRotateZ = options.mapSyncRotateZ || false
    this.followTarget = options.target
    this.container = options.container!
    if (!this.scene) {
      throw new Error('scene不能为空')
    }
    if (!this.followTarget) {
      throw new Error('target不能为空，表示小地图画面主要跟随对象')
    }

    this.add()
  }

  add() {
    const { mapSize, mapRenderSize, mapRotateZ } = this

    // 初始化小地图渲染器
    miniMapRenderer = new WebGLRenderer({ alpha: true })
    miniMapRenderer.setSize(mapRenderSize, mapRenderSize)
    miniMapRenderer.setClearColor(0x7d684f)
    miniMapRenderer.shadowMap.enabled = true
    miniMapRenderer.shadowMap.type = PCFSoftShadowMap
    miniMapRenderer.toneMapping = ACESFilmicToneMapping //电影渲染效果
    miniMapRenderer.toneMappingExposure = 0.6

    // 设置样式，并添加到HTML
    miniMapRenderer.domElement.id = 'mapcanvas'
    miniMapRenderer.domElement.style.position = 'absolute'
    miniMapRenderer.domElement.style.left = '5px'
    miniMapRenderer.domElement.style.top = '5px'
    miniMapRenderer.domElement.style.zIndex = '1'
    miniMapRenderer.domElement.style.transform = `rotateZ(${mapRotateZ}deg)`
    // miniMapRenderer.domElement.style.borderRadius = '16px'

    miniMapDomEl = miniMapRenderer.domElement
    this.container.appendChild(miniMapRenderer.domElement)

    // 初始化小地图相机
    miniMapCamera = new OrthographicCamera(-mapSize, mapSize, mapSize, -mapSize, 1, 1000) //在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。

    // 更新地图相机位置和朝向
    this.updateCamera()
  }

  updateCamera() {
    // 更新小地图css旋转角度，与玩家同步
    if (this.mapSyncRotateZ) {
      const targetRotateY = MathUtils.radToDeg(this.followTarget.rotation.y)
      miniMapDomEl.style.transform = `rotateZ(${this.mapRotateZ + targetRotateY}deg)`
    }

    // 更新地图相机位置和朝向
    const targetPos = this.followTarget.position
    miniMapCamera.position.set(targetPos.x, targetPos.y + 10, targetPos.z)
    miniMapCamera.lookAt(targetPos.x, 3, targetPos.z)
  }

  tick() {
    // 更新地图相机位置和朝向
    this.updateCamera()
    // 渲染小地图
    miniMapRenderer.render(this.scene, miniMapCamera)
  }
}
