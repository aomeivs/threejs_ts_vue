/*
 * @Author: zhou lei
 * @Date: 2024-02-18 14:54:43
 * @LastEditTime: 2024-02-18 15:04:28
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/utils/service.ts
 * 联系方式:910592680@qq.com
 */
import request from './request'
export class BaseService {
  namespace?: string
  constructor(
    options = {} as {
      namespace?: string
    }
  ) {
    if (options?.namespace) {
      this.namespace = options.namespace
    }
  }
  request(
    options = {} as {
      params?: any
      data?: any
      url: string
      method?: 'GET' | 'get' | 'POST' | 'post' | string
      [key: string]: any
    }
  ) {
    if (!options.params) options.params = {}
    return request(options)
  }
}
