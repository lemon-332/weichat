import request from '@/utils/request'

export const login = (data: any) => {
  return request('/api/login', data)
}

export const checkCode = () => {
  return request({
    url: '/checkCode',
    method: 'get'
  })
}
