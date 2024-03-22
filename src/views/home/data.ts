/*
 * @Author: zhou lei
 * @Date: 2024-03-11 09:46:03
 * @LastEditTime: 2024-03-22 13:17:30
 * @LastEditors: zhoulei && 910592680@qq.com
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
/**
 */
export const eqipmentMeshCollection = [
  {
    target: 'pasted__extrudedSurface2',
    meshName: 'pasted__extrudedSurface2',
    alias: '上件点',
    position: 'top',
    state: 0
  },
  {
    target: 'pasted__extrudedSurface8',
    meshName: 'pasted__extrudedSurface8',
    alias: '下件点',
    position: 'bottom',
    state: 0
  },
  {
    target: 'pasted__group59_pCylinder158',
    meshName: 'pasted__group59_pCylinder158',
    alias: '水份烘干',
    position: 'bottom',
    state: 0
  },
  {
    target: 'pasted__pCube70',
    meshName: 'pasted__pCube70',
    alias: '抛丸机',
    position: 'top',
    state: 1
  },
  {
    target: 'pasted__pCube97',
    meshName: 'pasted__pCube97',
    alias: '喷淋前处理',
    position: 'top',
    state: 1
  },
  {
    target: 'polySurface152',
    meshName: 'polySurface152',
    alias: '大旋风自动喷房A',
    position: 'bottom',
    state: 1
  },
  {
    target: 'polySurface156',
    meshName: 'polySurface156',
    alias: '大旋风自动喷房B',
    position: 'bottom',
    state: 1
  },
  {
    target: 'polySurface230',
    meshName: 'polySurface230',
    alias: '粉末固化炉',
    position: 'bottom',
    state: 1
  },
  {
    target: 'polySurface258',
    meshName: 'polySurface258',
    alias: '强冷吹风机',
    position: 'bottom',
    state: 1
  }
]