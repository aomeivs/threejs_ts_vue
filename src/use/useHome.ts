/*
 * @Author: zhou lei
 * @Date: 2024-03-12 13:48:38
 * @LastEditTime: 2024-03-21 11:04:27
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/use/useHome.ts
 * 联系方式:910592680@qq.com
 */
import { getequipmentwarning } from '@/api/factory'
import { ref } from 'vue'
import { TWEEN, camera, controls } from '@/App'
import type { EquipmentWarning, GetequipmentStatusRT } from '@/types/api'
import dayjs from 'dayjs'
import { useHomeStore } from '@/stores/home'
const { getEquipmentStatusDispach } = useHomeStore()
const intervalMap = new Map()
export const useHome = () => {
  // 设备速度列表
  const equipmentSpeedList = ref<GetequipmentStatusRT[]>([])
  // 设备温度列表
  const equipmentTemperatureList = ref<GetequipmentStatusRT[]>([])
  // 设备状态
  const equipmentStatusList = ref<GetequipmentStatusRT[]>([])
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
  /**
   * 视角控制
   * @param type
   */
  const rotatCamera = (type: number) => {
    const initialPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    }

    const targetPosition: any = {
      1: { x: 0, y: 13, z: 9 },
      2: { x: 0, y: 18, z: 0 },
      3: { x: -10, y: 10, z: 10 }
    }

    new TWEEN.Tween(initialPosition)
      .to(targetPosition[type], 800)
      .onUpdate((obj: any) => {
        camera.position.set(obj.x, obj.y, obj.z)
        controls.target.set(0, 0, 0)
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start()
  }

  return {
    clearHomeInterval,
    getEquipmentStatus,
    getEquipmentwarning,
    rotatCamera,
    createInterval,
    equipmentWarning,
    equipmentSpeedList,
    equipmentTemperatureList,
    equipmentStatusList
  }
}
