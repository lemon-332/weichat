import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

let loading: any = null

const request = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

request.interceptors.request.use(
  (config) => {
    loading = ElLoading.service({
      lock: true,
      text: '加载中......',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  (error) => {
    if (loading) {
      loading.close()
    }
    ElMessage({
      message: error || 'Error',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    if (loading) {
      loading.close()
    }
    const responseData = response.data
    if (responseData.code !== 200) {
      ElMessage({
        message: responseData.message || 'Error',
        type: 'error'
      })
      return Promise.reject(responseData.message || 'Error')
    } else {
      return responseData
    }
  },
  (error) => {
    if (loading) {
      loading.close()
    }
    return Promise.reject(error)
  }
)

export default request
