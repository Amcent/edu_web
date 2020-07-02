import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getAbilities(params) {
    return request.get(api.evaluation, params);
  },
};

export default courseService;
