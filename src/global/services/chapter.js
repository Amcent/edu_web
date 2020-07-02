import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getChapter(id) {
    return request.get(api.theChapter(id));
  },
};

export default courseService;
