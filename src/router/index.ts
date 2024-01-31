/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-01-31 14:10:54
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/router/index.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
