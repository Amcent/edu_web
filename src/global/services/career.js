import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getCareer() {
    return request.get(api.career);
  },

  getTheCareer(id) {
    return request.get(api.theCareer(id));
  },
};

export default courseService;
