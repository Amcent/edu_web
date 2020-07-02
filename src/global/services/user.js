import api from '../request/api'
import request from '../request/axios'

const userService = {
  update: (params) => {
    return request.put(api.userInfo, params)
  },

  show: (params) => {
    return request.get(api.userInfo, params)
  },

  bindPhone: (params) => {
    return request.put(api.bindPhone, params)
  },

  bindWechat: (params) => {
    return request.get(api.bindWechat, params)
  },

  unbindWechat: () => {
    return request.delete(api.bindWechat)
  }
}

export default userService
