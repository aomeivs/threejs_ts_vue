/*
 * @Author: zhou lei
 * @Date: 2024-02-02 10:29:09
 * @LastEditTime: 2024-03-28 16:47:20
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/gui.ts
 
 */
import { type App } from '@/App'
import GUI from 'lil-gui'
import { explodeModel } from '../effect/exploder'

const createGUI = (app: App) => {
  // 创建GUI对象
  const gui = new GUI({
    title: '控制参数',
    width: 300
  })
  gui.close()
  // 添加一个按钮
  const view0 = gui.addFolder('工厂模型')
  const view = gui.addFolder('风力发电机模型')
  const viewParams0 = {
    显示: true,
    爆破: false,
    小地图: false
    // turbineLabel: false
  }
  view0
    .add(viewParams0, '显示')
    .name('模型切换显示')
    .onChange((value: boolean) => {
      app.changeLayers(value ? 0 : 1)
    })
  view0
    .add(viewParams0, '爆破')
    .name('工厂模型展开')
    .onChange((value: boolean) => {
      if (value) {
        explodeModel(app.model.factory?.model!, 2)
      } else {
        explodeModel(app.model.factory?.model!, 1)
      }
    })
  view0
    .add(viewParams0, '小地图')
    .name('开启小地图')
    .onChange((value: boolean) => {
      const mapcanvas: HTMLElement = document.querySelector('#mapcanvas')!
      if (value) {
        mapcanvas.style.display = 'block'
      } else {
        mapcanvas.style.display = 'none'
      }
    })

  const viewParams = {
    显示: false,
    颜色材质: true,
    线框材质: true
    // turbineLabel: false
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
  // view
  //   .add(viewParams, 'turbineLabel')
  //   .name('标签')
  //   .onChange((value: boolean) => {
  //     app.showTurbineLabel(value)
  //   })
  const animationParams = {
    播放: true
  }
  const animation = gui.addFolder('动画')
  animation.add(animationParams, '播放').onChange((value: boolean) => {
    app.play('Anim_0', value)
  })
  return gui
}
export { createGUI }
