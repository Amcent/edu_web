import api from '../request/api';
import request from '../request/axios';

const courseService = {
  getRecommandCourse(params) {
    return request.get(api.courseRecommand, params);
  },

  getCourse(id) {
    return request.get(api.theCourse(id));
  },
};

export default courseService;
