import { defineStore } from 'pinia'

interface UserInfo {
  email: string
  nickname: string
}

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfo: {
      email: '',
      nickname: 'admin'
    }
  }),
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    getUserInfo() {
      return this.userInfo
    }
  }
})
