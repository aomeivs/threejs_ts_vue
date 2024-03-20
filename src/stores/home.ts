/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-20 13:09:04
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/stores/home.ts
 * 联系方式:910592680@qq.com
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { GetequipmentStatusRT } from '@/types/api'
import { getequipmentStatus } from '@/api/factory'
export const useHomeStore = defineStore('home', () => {
  // 设备速度列表
  const equipmentSpeedList = ref<GetequipmentStatusRT[]>([])
  // 设备温度列表
  const equipmentTemperatureList = ref<GetequipmentStatusRT[]>([])
  // 设备状态
  const equipmentStatusList = ref<GetequipmentStatusRT[]>([])
  const equipmentList = ref<GetequipmentStatusRT[]>([])
  async function getEquipmentStatusDispach() {
    const result = await getequipmentStatus()
    const data = result.getequipmentStatusRTs
    const speedIDs = ['SFHGLRSJYX000']
    const temperatureIDs = ['SFHGLRSJYX010']
    equipmentList.value = data
    equipmentSpeedList.value = data.filter((item) => speedIDs.includes(item.equipmentCode))
    equipmentTemperatureList.value = data.filter((item) =>
      temperatureIDs.includes(item.equipmentCode)
    )
    // 剩余的设备要排除speedIDs和temperatureIDs
    equipmentStatusList.value = data.filter(
      (item) => !speedIDs.concat(temperatureIDs).includes(item.equipmentCode)
    )
  }

  return {
    equipmentList,
    equipmentSpeedList,
    equipmentTemperatureList,
    equipmentStatusList,
    getEquipmentStatusDispach
  }
})