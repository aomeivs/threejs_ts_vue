/*
 * @Author: zhou lei
 * @Date: 2024-03-12 13:48:38
 * @LastEditTime: 2024-03-19 16:42:23
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/use/useHome.ts
 * 联系方式:910592680@qq.com
 */
import { getequipmentStatus, getequipmentwarning } from '@/api/factory'
import { ref } from 'vue'
import { TWEEN, camera, controls } from '@/App'
import type { EquipmentWarning, GetequipmentStatusRT } from '@/types/api'
import dayjs from 'dayjs';

export const useHome = () => {
  // 设备速度列表
  const equipmentSpeedList = ref<GetequipmentStatusRT[]>([])
  // 设备温度列表
  const equipmentTemperatureList = ref<GetequipmentStatusRT[]>([])
  // 设备状态
  const equipmentStatusList = ref<GetequipmentStatusRT[]>([])
  // 设备报警
  const equipmentWarning = ref<EquipmentWarning>()

  const precent = (params:string) =>{
    return parseFloat(params)/13*100

  }
  /**
   *
   * 报警信息获取
   */
  const getEquipmentwarning = async () => {
    const result = await getequipmentwarning()
    if (result.code) {
      equipmentWarning.value = result;
      equipmentWarning.value.getequipmentWarningRTs.forEach(item =>{
        item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss');
      })
    }
    return {equipmentWarning:equipmentWarning.value}
  }
  const getEquipmentStatus = async () => {
    const result = await getequipmentStatus()
    const data = result.getequipmentStatusRTs
    const temperatureIDs = ['ZTZSW', 'SFHGLW', 'YTZSW', 'GHL2SW', 'GHL1SW']
    const speedIDs = ['TC2FFSD', 'L4XSD', 'TC1FFSD']
    const oldspeedlist  = data.filter((item) => speedIDs.includes(item.equipmentCode))
    equipmentSpeedList.value = [{
      equipmentName: 'L1-L3线速度',
      equipmentValue: '12',
      equipmentCode: 'xxx',
      speedprecent: precent('12')
    }]
    oldspeedlist.forEach((item)=>{
      if(item.equipmentCode == 'L4XSD'){
        equipmentSpeedList.value.push({...item,speedprecent:precent(item.equipmentValue)})
      }else if(item.equipmentCode == 'TC1FFSD'){
        equipmentSpeedList.value.push({...item,speedprecent:precent(item.equipmentValue)})
      }else if(item.equipmentCode == 'TC2FFSD'){
        equipmentSpeedList.value.push({...item,speedprecent:precent(item.equipmentValue)})
      }  
    })
    
    

    equipmentTemperatureList.value = data.filter((item) =>
      temperatureIDs.includes(item.equipmentCode)
    )
    // 剩余的设备要排除speedIDs和temperatureIDs
    equipmentStatusList.value = data.filter(
      (item) =>
        !speedIDs.includes(item.equipmentCode) && !temperatureIDs.includes(item.equipmentCode)
    )
    // if (data) {
    //   extractedArray.value = data.filter((item) => bianmacode.includes(item.equipmentCode))
    //   originalArray.value = data.filter((item) => !bianmacode2.includes(item.equipmentCode))
    //   speedtwo.value = data.filter((item) => item.equipmentCode === 'L4XSD')
    //   speedone.value = 12
    //   speedthree.value = data.filter((item) => item.equipmentCode === 'TC1FFSD')
    //   speedfour.value = data.filter((item) => item.equipmentCode === 'TC2FFSD')
    //   speedonevalue.value = (12 / 13) * 100
    //   speedtwovalue.value = (parseFloat(speedtwo.value[0].equipmentValue) / 13) * 100
    //   speedthreevalue.value = (parseFloat(speedthree.value[0].equipmentValue) / 13) * 100
    //   speedfourvalue.value = (parseFloat(speedfour.value[0].equipmentValue) / 13) * 100
    // }
    return {equipmentSpeedList:equipmentSpeedList.value, equipmentTemperatureList:equipmentTemperatureList.value, equipmentStatusList:equipmentStatusList.value}
  }

  /**
   * 报警信息数据处理
   * @returns
   */
  const initScrollData = () => {
    const list = []
    for (let key = 0; key < 10; key++) {
      list.push({
        id: Date.now(),
        title:
          'Vue3.0 无缝滚动组件展示数据第1条无缝滚动组件展示数据第1条无缝滚动组件展示数据第1条'.substr(
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 30)
          ),
        date: '2024-01-01 12:12:00',
        state: '已处理'
      })
    }
    return list
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
      .onUpdate((obj:any) => {
        camera.position.set(obj.x, obj.y, obj.z)
        controls.target.set(0, 0, 0)
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start()
  }

  return {
    getEquipmentStatus,
    initScrollData,
    rotatCamera,
    getEquipmentwarning,
    equipmentWarning,
    equipmentSpeedList,
    equipmentTemperatureList,
    equipmentStatusList
  }
}
