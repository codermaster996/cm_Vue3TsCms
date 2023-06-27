import { defineStore } from 'pinia'
import type { IAccount } from '@/types/login'
import { accountLoginRequest } from '../../service/login/login'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'

const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 登录成功提示
      ElMessage.success('登陆成功')
    }
  }
})

export default useLoginStore
