import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import DsRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const dsRequest = new DsRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  }
})

export default dsRequest
