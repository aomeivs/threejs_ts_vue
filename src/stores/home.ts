/*
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-21 13:07:56
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/stores/home.ts
 * 联系方式:910592680@qq.com
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { GetequipmentStatusRT } from '@/types/api'
import { getequipmentStatus } from '@/api/factory'
import type { HtmlMeshCollection } from '@/App'
import { htmlMeshCollection } from '@/views/home/data'
export const useHomeStore = defineStore('home', () => {
  // 设备速度列表
  const equipmentSpeedList = ref<GetequipmentStatusRT[]>([])
  // 设备温度列表
  const equipmentTemperatureList = ref<GetequipmentStatusRT[]>([])
  // 设备状态
  const equipmentStatusList = ref<GetequipmentStatusRT[]>([])
  const equipmentList = ref<GetequipmentStatusRT[]>([])

  const boardTopList = ref<HtmlMeshCollection[]>([])
  const boardBottomList = ref<HtmlMeshCollection[]>([])
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


    boardTopList.value = htmlMeshCollection.filter((html) => {
      const obj = equipmentList.value.find((child) => child.equipmentCode == html.target)
      if (obj) {
        Object.assign(html, obj)
        if (html.position === 'top') {
          return true
        }
      } else {
        return false
      }
    })
    boardBottomList.value = htmlMeshCollection.filter((html) => {
      const obj = equipmentList.value.find((child) => child.equipmentCode == html.target)
      if (obj) {
        Object.assign(html, obj)
        if (html.position === 'bottom') {
          return true
        }
      } else {
        return false
      }
    })
  }

  return {
    equipmentList,
    equipmentSpeedList,
    equipmentTemperatureList,
    equipmentStatusList,
    boardTopList,
    boardBottomList,
    getEquipmentStatusDispach
  }
})
