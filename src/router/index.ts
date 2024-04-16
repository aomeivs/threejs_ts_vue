/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-04-01 17:02:08
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/router/index.ts
 *
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import WmsView from '../views/wms/WmsView.vue'
import DeviceView from '../views/device/DeviceView.vue'
import Home2View from '../views/Home2View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wms',
      name: 'wms',
      component: WmsView
    },{
      path: '/device',
      name: 'device',
      component: DeviceView
    },
    {
      path: '/home2',
      name: 'home2',
      component: Home2View
    }
  ]
})

export default router
