/*
 * @Author: zhou lei
 * @Date: 2024-03-19 15:50:08
 * @LastEditTime: 2024-03-19 15:50:11
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/types/api.d.ts
 * 联系方式:910592680@qq.com
 */
export interface GetequipmentWarningRT {
  name: string
  faultName: string
  isDispose: string
  createTime: string
}

export interface EquipmentWarning {
  getequipmentWarningRTs: GetequipmentWarningRT[]
  theSameMonth: number
  inThoseDays: number
  code: number
  mESSAGE: string
}
export interface GetequipmentStatusRT {
  equipmentName: string
  equipmentValue: string
  equipmentCode: string
  speedprecent?: Number
}

export interface EquipmentStatusRT {
  getequipmentStatusRTs: GetequipmentStatusRT[]
  code: number
  mESSAGE: string
}
