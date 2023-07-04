import dsRequest from '..'
import type { IAccount } from '@/types/login'

export function accountLoginRequest(account: IAccount) {
  return dsRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return dsRequest.get({
    url: `/users/${id}`
  })
}

export function UserMenusListRequest(id: number) {
  return dsRequest.get({
    url: `/role/${id}/menu`
  })
}
