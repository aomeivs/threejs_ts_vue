/*
 * @Author: zhou lei
 * @Date: 2024-03-21 09:35:14
 * @LastEditTime: 2024-03-21 16:46:26
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/config/config.ts
 * 
 */
export const globalConfig = {
  // 忽略规则
  ignore: {
    // 不显示请求进度条
    NProgress: ['/waring', '/status'],
    // 页面不需要登录验证
    token: ['/login', '/401', '/403', '/404', '/500', '/502']
  },
  // 开启debug
  debug: true
}
