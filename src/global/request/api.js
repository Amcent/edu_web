const PREFIX_API = 'http://127.0.0.1:7001/api';

export default {
  // phone login
  smsSend: `${PREFIX_API}/sms/send`,
  smsLogin: `${PREFIX_API}/sms/login`,

  // wechat login
  socialWechatUrl: `${PREFIX_API}/auth/social/wechat/url`,
  socialWechat: `${PREFIX_API}/auth/social/wechat`,

  // qiniu
  qiniuToken: `${PREFIX_API}/qiniu/token`,

  //user
  userInfo: `${PREFIX_API}/user-info`,
  bindPhone: `${PREFIX_API}/user/bind-phone`,
  bindWechat: `${PREFIX_API}/user/bind-wechat`,

  // course
  course: `${PREFIX_API}/course`,
  theCourse: id => `${PREFIX_API}/course/${id}`,
  courseRecommand: `${PREFIX_API}/course-recommand`,
  theChapter: id => `${PREFIX_API}/chapter/${id}`,
  theSection: id => `${PREFIX_API}/section/${id}`,

  // career
  career: `${PREFIX_API}/career`,
  theCareer: id => `${PREFIX_API}/career/${id}`,

  // evaluation
  evaluation: `${PREFIX_API}/ability`,

  // question
  theQuestion: id => `${PREFIX_API}/question/${id}`,
};
