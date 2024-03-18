/*
 * @Author: zhou lei
 * @Date: 2024-03-11 09:46:03
 * @LastEditTime: 2024-03-18 13:42:06
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/data.ts
 * 联系方式:910592680@qq.com
 */
import type { HtmlMeshCollection } from '@/App'
export const htmlMeshCollection: HtmlMeshCollection[] = [
  {
    target: 'DD_SHANGJIAN',
    meshName: 'DD_SHANGJIAN',
    alias: '上件点',
    position: 'top'
  },
  {
    target: 'DD_SHUIFENHONGGAN',
    meshName: 'DD_SHUIFENHONGGAN',
    alias: '水份烘干',
    position: 'top'
  },{
    target: 'DD_PAOWANJI',
    meshName: 'DD_PAOWANJI',
    alias: '抛丸机',
    position: 'top'
  },{
    target: 'DD_PENGLINJI',
    meshName: 'DD_PENGLINJI',
    alias: '喷淋前处理',
    position: 'top'
  },
  // bottom
  {
    target: 'DD_PENGFANG1',
    meshName: 'DD_PENGFANG1',
    alias: '大旋风自动喷房A',
    position: 'bottom'
  },
  {
    target: 'DD_PENGFANG2',
    meshName: 'DD_PENGFANG2',
    alias: '大旋风自动喷房B',
    position: 'bottom'
  },
  {
    target: 'DD_XIAJIAN',
    meshName: 'DD_XIAJIAN',
    alias: '下件点',
    position: 'bottom'
  },
  {
    target: 'DD_FENMOGUHUALV',
    meshName: 'DD_FENMOGUHUALV',
    alias: '粉末固化炉',
    position: 'bottom'
  },
  {
    target: 'DD_CHUIFENGJI',
    meshName: 'DD_CHUIFENGJI',
    alias: '强冷吹风机',
    position: 'bottom'
  }
]

export const getTipsBoard = (position: 'top' | 'bottom'): HtmlMeshCollection[] => {
  return htmlMeshCollection.filter((item) => item.position === position)
}
