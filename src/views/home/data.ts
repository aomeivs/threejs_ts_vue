/*
 * @Author: zhou lei
 * @Date: 2024-03-11 09:46:03
 * @LastEditTime: 2024-03-20 13:06:10
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/data.ts
 * 联系方式:910592680@qq.com
 */
import type { HtmlMeshCollection } from '@/App'
export const htmlMeshCollection: HtmlMeshCollection[] = [
  {
    target: 'YTZJWQD1',
    meshName: 'DD_SHANGJIAN',
    alias: '上件点',
    position: 'top',
    state: 0
  },
  {
    target: 'YTZJWQD2',
    meshName: 'DD_SHUIFENHONGGAN',
    alias: '水份烘干',
    position: 'top',
    state: 0
  },
  {
    target: 'YTZJWQD3',
    meshName: 'DD_PAOWANJI',
    alias: '抛丸机',
    position: 'top',
    state: 1
  },
  {
    target: 'YTZJWQD4',
    meshName: 'DD_PENGLINJI',
    alias: '喷淋前处理',
    position: 'top',
    state: 1
  },
  // bottom
  {
    target: 'YTZJWQD5',
    meshName: 'DD_PENGFANG1',
    alias: '大旋风自动喷房A',
    position: 'bottom',
    state: 1
  },
  {
    target: 'YTZJWQD6',
    meshName: 'DD_PENGFANG2',
    alias: '大旋风自动喷房B',
    position: 'bottom',
    state: 1
  },
  {
    target: 'YTZJWQD7',
    meshName: 'DD_XIAJIAN',
    alias: '下件点',
    position: 'bottom',
    state: 1
  },
  {
    target: 'YTZJWQD8',
    meshName: 'DD_FENMOGUHUALV',
    alias: '粉末固化炉',
    position: 'bottom',
    state: 1
  },
  {
    target: 'YTZJWQD9',
    meshName: 'DD_CHUIFENGJI',
    alias: '强冷吹风机',
    position: 'bottom',
    state: 1
  }
]
