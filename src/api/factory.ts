import { defHttp } from '@/utils/http/axios'

export const deviceList = () => {
  return defHttp.get({ url: '/device/1' }, { isTransformResponse: false })
}
