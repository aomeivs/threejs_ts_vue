/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-12 10:22:38
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/main.ts
 * 联系方式:910592680@qq.com
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import DataVVue3 from '@kjgl77/datav-vue3'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(DataVVue3) //测试使用
app.use(vue3SeamlessScroll)
app.mount('#app')
