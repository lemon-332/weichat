import { ipcMain } from 'electron'

import store from './store'

const onLoginOrRegister = (callback) => {
  ipcMain.on('loginOrRegister', (event, isLogin) => {
    callback(isLogin)
  })
}

const onLoginSuccess = (callback) => {
  ipcMain.on('openChat', (event, config) => {
    store.initUserId(config.userId)
    store.setUserData('token', config.token)
    callback(config)
  })
}

export { onLoginOrRegister, onLoginSuccess }
