/*
 * @Author: zhou lei
 * @Date: 2024-02-02 10:29:09
 * @LastEditTime: 2024-03-22 10:09:15
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/gui.ts
 
 */
import { type App,camera } from '@/App'
import GUI from 'lil-gui'

const createGUI = (app: App) => {
  // 创建GUI对象
  const gui = new GUI({
    title: '控制参数',
    width: 300
  })
  // 添加一个按钮
  const view0 = gui.addFolder('工厂模型')
  const view = gui.addFolder('风力发电机模型')
  const viewParams0 = {
    显示: true
    // turbineLabel: false
  }
  view0
    .add(viewParams0, '显示')
    .name('显示')
    .onChange((value: boolean) => {
      camera.layers.toggle(0)
    })
  const viewParams = {
    显示: false,
    颜色材质: true,
    线框材质: true
    // turbineLabel: false
  }
  view
    .add(viewParams, '显示')
    .name('显示')
    .onChange((value: boolean) => {
      camera.layers.toggle(1)
    })
  view
    .add(viewParams, '颜色材质')
    .name('颜色材质')
    .onChange((value: boolean) => {
      app.show('颜色材质', value)
    })
  view
    .add(viewParams, '线框材质')
    .name('线框材质')
    .onChange((value: boolean) => {
      app.show('线框材质', value)
    })
  // view
  //   .add(viewParams, 'turbineLabel')
  //   .name('标签')
  //   .onChange((value: boolean) => {
  //     app.showTurbineLabel(value)
  //   })
  const animationParams = {
    播放: false
  }
  const animation = gui.addFolder('动画')
  animation.add(animationParams, '播放').onChange((value: boolean) => {
    app.play('Anim_0', value)
  })
  return gui
}
export { createGUI }
