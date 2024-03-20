/*
 * @Author: zhou lei
 * @Date: 2024-03-12 09:20:35
 * @LastEditTime: 2024-03-19 16:56:21
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/api/factory.ts
 * 联系方式:910592680@qq.com
 */
import type { EquipmentStatusRT, EquipmentWarning } from '@/types/api'
import { defHttp } from '@/utils/http/axios'
//import http from '@/utils/http/axios/index'

export const deviceList = () => {
  return defHttp.get({ url: '/device/1' }, { isTransformResponse: false })
}
const isDev = import.meta.env.DEV
console.log('import.meta.env.DEV:::', import.meta.env.DEV)
enum Api {
  equipmentStatus = '/api/wcs/ReceiveProdPlan/equipmentStatus',
  equipmentwarning = '/api/wcs/ReceiveProdPlan/equipmentwarning',
  equipmentStatusDev = '/status',
  equipmentwarningDev = '/waring'
}

export const getequipmentStatus = (data: {} = { isTransformResponse: false }) => {
  return defHttp.get<EquipmentStatusRT>(
    { url: isDev ? Api.equipmentStatusDev : Api.equipmentStatus },
    data
  )
}
export const getequipmentwarning = (data: {} = { isTransformResponse: false }) => {
  return defHttp.get<EquipmentWarning>(
    { url: isDev ? Api.equipmentwarningDev : Api.equipmentwarning },
    data
  )
}
