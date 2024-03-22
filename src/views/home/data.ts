/*
 * @Author: zhou lei
 * @Date: 2024-03-11 09:46:03
 * @LastEditTime: 2024-03-21 13:42:22
 * @LastEditors: zhoulei 
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/data.ts
 * 
 */
import type { HtmlMeshCollection } from '@/App'
export const htmlMeshCollection: HtmlMeshCollection[] = [
  {
    target: 'YTZAYX',
    meshName: 'DD_SHANGJIAN',
    alias: '上件点',
    position: 'top',
    state: 0
  },
  {
    target: 'YTZBYX',
    meshName: 'DD_SHUIFENHONGGAN',
    alias: '水份烘干',
    position: 'top',
    state: 0
  },
  {
    target: 'ZTZAYX',
    meshName: 'DD_PAOWANJI',
    alias: '抛丸机',
    position: 'top',
    state: 1
  },
  {
    target: 'SX1AYX',
    meshName: 'DD_PENGLINJI',
    alias: '喷淋前处理',
    position: 'top',
    state: 1
  },
  // bottom
  {
    target: 'SX1BYX',
    meshName: 'DD_PENGFANG1',
    alias: '大旋风自动喷房A',
    position: 'bottom',
    state: 1
  },
  {
    target: 'SX2BYX',
    meshName: 'DD_PENGFANG2',
    alias: '大旋风自动喷房B',
    position: 'bottom',
    state: 1
  },
  {
    target: 'GWAYX',
    meshName: 'DD_XIAJIAN',
    alias: '下件点',
    position: 'bottom',
    state: 1
  },
  {
    target: 'GWBYX',
    meshName: 'DD_FENMOGUHUALV',
    alias: '粉末固化炉',
    position: 'bottom',
    state: 1
  },
  {
    target: 'SX3AYX',
    meshName: 'DD_CHUIFENGJI',
    alias: '强冷吹风机',
    position: 'bottom',
    state: 1
  }
]