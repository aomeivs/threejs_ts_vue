/*
 * @Author: zhou lei
 * @Date: 2024-03-11 09:46:03
 * @LastEditTime: 2024-03-15 15:52:52
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/data.ts
 * 联系方式:910592680@qq.com
 */
import type { HtmlMeshCollection } from '@/App'
export const htmlMeshCollection: HtmlMeshCollection[] = [
  {
    target: 'XHN5261',
    meshName: 'DD_PENGFANG1',
    alias: '抛丸除尘',
    position: 'top'
  },
  {
    target: 'XHN5262',
    meshName: '支架盖045',
    alias: '粉末固化炉',
    position: 'top'
  },
  // bottom
  {
    target: 'XHN5263',
    meshName: '支架盖015',
    alias: '自动喷房',
    position: 'bottom'
  },
  {
    target: 'XHN5264',
    meshName: '支架盖033',
    alias: '烘干机',
    position: 'bottom'
  },
  {
    target: 'XHN5265',
    meshName: '支架盖012',
    alias: '吹水机',
    position: 'bottom'
  },
  {
    target: 'XHN5266',
    meshName: '支架盖024',
    alias: '冷却机',
    position: 'bottom'
  },
  {
    target: 'XHN5267',
    meshName: '支架盖009',
    alias: '支架盖033',
    position: 'bottom'
  }
]

export const getTipsBoard = (position: 'top' | 'bottom'): HtmlMeshCollection[] => {
  return htmlMeshCollection.filter((item) => item.position === position)
}
