const Store = require('electron-store')

const store = new Store()

let userId = null

const initUserId = (_userId) => {
  userId = _userId
}

const getUserId = () => {
  return userId
}

const setData = (key, value) => {
  store.set(key, value)
}

const getData = (key) => {
  return store.get(key)
}

const setUserData = (key, value) => {
  setData(`user.${userId}.${key}`, value)
}

const getUserData = (key) => {
  return getData(`user.${userId}.${key}`)
}

const deleteUserData = (key) => {
  store.delete(`user.${userId}.${key}`)
}

export default {
  setData,
  getData,
  initUserId,
  getUserId,
  setUserData,
  getUserData,
  deleteUserData
}
