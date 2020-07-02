import api from '../request/api';
import request from '../request/axios';
import DataStore from '../storage/index';

const authService = {
  getSmsCode(params) {
    return request.post(api.smsSend, params);
  },

  smsLogin(params) {
    return request.post(api.smsLogin, params).then(res => {
      DataStore.setToken(res.token);
      return res;
    });
  },

  getWechatSocialUrl(params) {
    return request.get(api.socialWechatUrl, params);
  },

  authSocialWechat(params) {
    console.log('authSocialWechat -> params', params);
    return request.get(api.socialWechat, params).then(res => {
      console.log('authSocialWechat -> res', res);
      DataStore.setToken(res.token);
      return res;
    });
  },
};

export default authService;
