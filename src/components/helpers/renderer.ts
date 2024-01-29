/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:57:00
 * @LastEditTime: 2024-01-29 11:43:00
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/components/helpers/renderer.ts
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
 */
import { WebGLRenderer } from 'three'

const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true })
  return renderer
}
export { createRenderer }
