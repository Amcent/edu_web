import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getQuestions(id) {
    return request.get(api.theQuestion(id));
  },
};

export default courseService;
