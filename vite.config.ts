/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-08 17:42:44
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/vite.config.ts
 * 联系方式:910592680@qq.com
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default ({ command, mode }: { command: string; mode: any }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('process.env.VITE_RES_HOST env:::', env)
  return defineConfig({
    assetsInclude: ['**/*.glb', '**/*.hdr'],
    plugins: [vue(), vueJsx(), Components()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      // 反向代理设置
      proxy: {
        '/api': {
          target: env.VITE_HOST_URL,//'http://192.168.0.7:5001'
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), '')
        }
      }
    }
  })
}
