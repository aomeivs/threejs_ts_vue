import {
  WebGLRenderTarget,
  HalfFloatType,
  RGBAFormat,
  Vector2,
  WebGLRenderer,
  Scene,
  Camera
} from 'three'
import {
  EffectComposer,
  OutlinePass,
  RenderPass,
  ShaderPass,
  FXAAShader,
  SMAAPass,
  OutputPass
} from 'three/examples/jsm/Addons.js'
let renderer: WebGLRenderer, scene: Scene, camera: Camera
export type OutlineEffectType = { compose: EffectComposer; outlinePass: OutlinePass }
// 为点击的模型添加 outlinepass 效果
const outlineEffect = (
  selectedObjects: any,
  color: number = 0x15c5e8
): OutlineEffectType => {
  const [w, h] = [window.innerWidth, window.innerHeight]
  const pixelRatio: number = 2
  const targetRenderer = new WebGLRenderTarget(w, h, {
    type: HalfFloatType,
    format: RGBAFormat
  })
  targetRenderer.samples = 8
  const compose = new EffectComposer(renderer, targetRenderer)
  const renderPass = new RenderPass(scene, camera)
  // renderPass.clear = false
  const outlinePass = new OutlinePass(new Vector2(w, h), scene, camera)
  const effectFXAA = new ShaderPass(FXAAShader)
  const effectSMAA = new SMAAPass(
    w * renderer.getPixelRatio() * pixelRatio,
    h * renderer.getPixelRatio() * pixelRatio
  )
  // const gammaPass = new ShaderPass(GammaCorrectionShader)
  // const dotScreenShader = new ShaderPass(DotScreenShader)
  // dotScreenShader.uniforms['scale'].value = 4
  effectFXAA.uniforms['resolution'].value.set(
    1 / (window.innerWidth * renderer.getPixelRatio() * pixelRatio),
    1 / (window.innerHeight * renderer.getPixelRatio() * pixelRatio)
  )
  const outputPass = new OutputPass()
  outlinePass.renderToScreen = true
  outlinePass.selectedObjects = selectedObjects
  compose.addPass(renderPass)
  compose.addPass(outlinePass)
  compose.addPass(outputPass)
  // 抗锯齿方式
  // compose.addPass(effectFXAA)
  compose.addPass(effectSMAA)
  // 伽马校正
  // compose.addPass(gammaPass)
  // compose.addPass(dotScreenShader)
  const params = {
    edgeStrength: 3,
    edgeGlow: 1,
    edgeThickness: 2,
    pulsePeriod: 1,
    usePatternTexture: false
  }
  outlinePass.edgeStrength = params.edgeStrength
  outlinePass.edgeGlow = params.edgeGlow
  outlinePass.visibleEdgeColor.set(color)
  outlinePass.hiddenEdgeColor.set(color)
  compose.setSize(w, h)
  compose.setPixelRatio(window.devicePixelRatio * pixelRatio)

  Object.assign(compose, {
    tick: (delta: number) => {
      compose.render(delta)
    }
  })

  return { compose, outlinePass }
}
const useEffectHooks = (use_renderer: WebGLRenderer, use_scene: Scene, use_camera: Camera) => {
  renderer = use_renderer
  scene = use_scene
  camera = use_camera
  return {
    outlineEffect
  }
}
export default useEffectHooks
