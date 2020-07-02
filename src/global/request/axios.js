import axios from 'axios'
import DataStore from '@/global/storage/index'
import { Message } from 'element-ui'

const axiosInstance = axios.create()
axiosInstance.defaults.timeout = 20000

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    const TOKEN = DataStore.getToken()

    if (TOKEN) {
      newConfig['headers']['Authorization'] = `Bearer ${TOKEN}`
    }
    return newConfig
  },
  (error) => Promise.reject(error)
)

const successRes = (res) => {
  switch (true) {
    case res.data.error_code === 0:
      return res.data.data

    case res.data.error_code === 1:
      Message.error(res.data.message)
      return Promise.reject(res.data)

    default:
      return res.data
  }
}

const errorRes = (error) => {
  handleErrorRequest(error)
  return Promise.reject(error)
}

const handleErrorRequest = (error) => {
  const { response } = error
  const status = response ? response.status : 408

  if (response) {
    const { data } = response
    const message = data.message

    if (status === 401) {
      Message.error('登录状态过期，请重新登录')
      DataStore.clear()
    } else if (status === 403) {
      Message.error('没有权限，联系管理员')
    } else {
      Message.error(message)
    }
  } else {
    Message.error('网络超时')
  }
}

axiosInstance.interceptors.response.use(successRes, errorRes)

export default {
  get(url = '', params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config)
    return axiosInstance.get(url, OPTIONS)
  },

  post(url = '', data = {}, config = {}) {
    return axiosInstance.post(url, data, config)
  },

  put(url = '', data = {}, config = {}) {
    return axiosInstance.put(url, data, config)
  },

  delete(url = '', params = {}, config = {}) {
    const OPTIONS = Object.assign({ params }, config)
    return axiosInstance.delete(url, OPTIONS)
  },
}
