import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getSection(id) {
    return request.get(api.theSection(id));
  },
};

export default courseService;
