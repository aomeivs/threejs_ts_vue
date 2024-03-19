/*
 * @Author: zhou lei
 * @Date: 2024-03-12 13:48:38
 * @LastEditTime: 2024-03-19 14:09:56
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/use/useHome.ts
 * 联系方式:910592680@qq.com
 */
import { getequipmentStatus, getequipmentwarning, type Info } from '@/api/factory'
import { ref } from 'vue'
import { TWEEN, camera, controls } from '@/App'
export const useHome = () => {
  // Get the individual date and time components
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are zero-based, so we add 1
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')

  // Format the date and time in the desired format
  const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}`

  //请求数据
  const inThoseDays = ref<number>(0)
  const theSameMonth = ref<number>(0)
  const tableData = ref<Info[]>([])
  const originalArray = ref([])
  const extractedArray = ref([])
  const speedone = ref(0)
  const speedtwo = ref([])
  const speedthree = ref([])
  const speedfour = ref([])
  const speedonevalue = ref(0)
  const speedtwovalue = ref(0)
  const speedthreevalue = ref(0)
  const speedfourvalue = ref(0)

  const equipmentwarning = async () => {
    const result = await getequipmentwarning()
    //debugger;
    console.log('数据', result?.inThoseDays)
    const data = result?.getequipmentWarningRTs
    const inThoseDaysvalue = result?.inThoseDays
    const theSameMonthvalue = result?.theSameMonth
    if (data) {
      tableData.value = data
      tableData.value.forEach((item) => {
        // Create a new Date object from the createTime string
        const date = new Date(item.createTime)

        // Format the date and time to "YYYY-MM-DD HH:MM:SS" format
        const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`

        // Update the createTime property in the item with the formatted date and time
        item.createTime = formattedDateTime
      })
    }
    if (inThoseDaysvalue) {
      inThoseDays.value = inThoseDaysvalue
    }
    if (theSameMonthvalue) {
      theSameMonth.value = theSameMonthvalue
    }
  }
  const equipmentStatus = async () => {
    const result = await getequipmentStatus()
    const data = result?.getequipmentStatusRTs
    const bianmacode = ['ZTZSW', 'SFHGLW', 'YTZSW', 'GHL2SW', 'GHL1SW']
    const bianmacode2 = [
      'ZTZSW',
      'SFHGLW',
      'YTZSW',
      'GHL2SW',
      'GHL1SW',
      'TC2FFSD',
      'L4XSD',
      'TC1FFSD'
    ]
    if (data) {
      extractedArray.value = data.filter((item) => bianmacode.includes(item.equipmentCode))
      originalArray.value = data.filter((item) => !bianmacode2.includes(item.equipmentCode))
      speedtwo.value = data.filter((item) => item.equipmentCode === 'L4XSD')
      speedone.value = 12
      speedthree.value = data.filter((item) => item.equipmentCode === 'TC1FFSD')
      speedfour.value = data.filter((item) => item.equipmentCode === 'TC2FFSD')
      speedonevalue.value = (12 / 13) * 100
      speedtwovalue.value = (parseFloat(speedtwo.value[0].equipmentValue) / 13) * 100
      speedthreevalue.value = (parseFloat(speedthree.value[0].equipmentValue) / 13) * 100
      speedfourvalue.value = (parseFloat(speedfour.value[0].equipmentValue) / 13) * 100
      console.log('......speedthree', speedthree.value[0].equipmentValue)
    }
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
      .onUpdate((obj) => {
        camera.position.set(obj.x, obj.y, obj.z)
        controls.target.set(0, 0, 0)
      })
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .start()
  }

  return { equipmentStatus, initScrollData, rotatCamera }
}
