import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 针对AxiosRequestConfig配置进行扩展
interface DSInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface DSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DSInterceptors<T>
}
