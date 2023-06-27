import dsRequest from '..'
import type { IAccount } from '@/types/login'

export function accountLoginRequest(account: IAccount) {
  return dsRequest.post({
    url: '/login',
    data: account
  })
}
