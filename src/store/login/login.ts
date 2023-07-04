import { defineStore } from 'pinia'
import type { IAccount } from '@/types/login'
import {
  accountLoginRequest,
  getUserInfoById,
  UserMenusListRequest
} from '../../service/login/login'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'

import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? '',
    userMenus: localCache.getCache(USER_MENUS) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await UserMenusListRequest(id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENUS, userMenus)

      // 5.页面跳转(main页面) 和 登录成功提示
      ElMessage.success('登陆成功')
      router.push('/main')
    }
  }
})

export default useLoginStore
