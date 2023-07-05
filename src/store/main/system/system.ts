import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import { postUserListData } from '@/service/main/system/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUserListActions() {
      const usersListResult = await postUserListData()
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    }
  }
})

export default useSystemStore
