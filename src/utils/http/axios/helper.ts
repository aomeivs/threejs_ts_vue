/*
 * @Author: zhou lei
 * @Date: 2024-02-18 15:14:15
 * @LastEditTime: 2024-02-18 15:31:18
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/utils/http/axios/helper.ts
 * 联系方式:910592680@qq.com
 */
import type { Recordable } from '@/types/utils'
import { isObject, isString } from '@/utils/is'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    const format = params[key]?.format ?? null
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}
