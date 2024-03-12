import { defHttp } from '@/utils/http/axios'
//import http from '@/utils/http/axios/index'

export const deviceList = () => {
  return defHttp.get({ url: '/device/1' }, { isTransformResponse: false })
}
enum Api {
  equipmentStatus = '/api/wcs/ReceiveProdPlan/equipmentStatus',
  equipmentwarning = '/api/wcs/ReceiveProdPlan/equipmentwarning'
}

export const getequipmentStatus = (data?: {}) => {
  return defHttp.post({ url: '/api/wcs/ReceiveProdPlan/equipmentStatus' }, data)
}
export const getequipmentwarning = (data?: {}) => {
  return defHttp.post({ url: '/api/wcs/ReceiveProdPlan/equipmentwarning' }, data)
}
