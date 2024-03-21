/*
 * @Author: zhou lei
 * @Date: 2024-03-12 13:48:38
 * @LastEditTime: 2024-03-21 13:08:39
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/use/useHome.ts
 * 联系方式:910592680@qq.com
 */
import { getequipmentwarning } from '@/api/factory'
import { ref } from 'vue'
import type { EquipmentWarning } from '@/types/api'
import dayjs from 'dayjs'
import { useHomeStore } from '@/stores/home'
const { getEquipmentStatusDispach } = useHomeStore()
const intervalMap = new Map()
export const useHome = () => {
  // 设备报警
  const equipmentWarning = ref<EquipmentWarning>()

  const createInterval = (fn: () => Promise<any>, time: number = 1000) => {
    const interval = setInterval(async () => {
      await fn()
    }, time)
    intervalMap.set(fn.name, interval)
  }

  /**
   *
   * 报警信息获取
   */
  const getEquipmentwarning = async () => {
    const result = await getequipmentwarning()
    if (result.code) {
      equipmentWarning.value = result
      equipmentWarning.value.getequipmentWarningRTs.forEach((item) => {
        item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      })
    }
  }
  const getEquipmentStatus = async () => {
    getEquipmentStatusDispach()
  }
  const clearHomeInterval = (name?: string) => {
    if (name) {
      clearInterval(intervalMap.get(name))
      intervalMap.delete(name)
    } else {
      intervalMap.forEach((item, key) => {
        clearInterval(item)
        intervalMap.delete(key)
      })
    }
  }


  return {
    clearHomeInterval,
    getEquipmentStatus,
    getEquipmentwarning,
    createInterval,
    equipmentWarning,
  }
}
