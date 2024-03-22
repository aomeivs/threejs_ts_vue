/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-20 15:08:47
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/main.ts
 * 
 */
import './assets/main.css'
import 'animate.css'
import { createApp } from 'vue'
import pinia from '@/stores/index'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DataVVue3 from '@kjgl77/datav-vue3'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(DataVVue3) //测试使用
// @ts-ignore
app.use(vue3SeamlessScroll)
app.mount('#app')
