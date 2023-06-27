import DsRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const dsRequest = new DsRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default dsRequest
