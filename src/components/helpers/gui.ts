/*
 * @Author: zhou lei
 * @Date: 2024-02-02 10:29:09
 * @LastEditTime: 2024-02-02 10:41:27
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/gui.ts
 * 联系方式:910592680@qq.com
 */
import type { App } from '@/App'
import GUI from 'lil-gui'

const createGUI = (app: App) => {
  // 创建GUI对象
  const gui = new GUI({
    title: '控制参数',
    width: 300
  })
  // 添加一个按钮
  const view = gui.addFolder('显示')
  const viewParams = {
    颜色材质: true,
    线框材质: true
  }
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
  const animationParams = {
    播放: false
  }
  const animation = gui.addFolder('动画')
  animation.add(animationParams, '播放').onChange((value: boolean) => {
    app.play('Anim_0', value)
  })
}
export { createGUI }
