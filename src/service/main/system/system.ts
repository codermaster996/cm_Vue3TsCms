import dsRequest from '@/service'

/** 用户的网络请求 */
export function postUserListData() {
  return dsRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
