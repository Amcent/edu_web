import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AuthSocialWechat from '../views/AuthSocialWechat';
import BasicLayout from '../components/Layout/BasicLayout';
import UserInfo from '../views/User/UserInfo.vue';
import UserBind from '../views/User/UserBind.vue';
import BindWechat from '../views/User/BindWechat.vue';
import Career from '../views/Career/Career.vue';
import CareerCourse from '../views/Career/CareerCourse.vue';
import Project from '../views/Project/Project.vue';
import Evaluation from '../views/Evaluation/Evaluation.vue';
import Question from '../views/Evaluation/Question.vue';
import Course from '../views/Course/Course.vue';
import Section from '../views/Course/Section.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/social/wechat',
    name: AuthSocialWechat,
    component: AuthSocialWechat,
  },
  {
    path: '/',
    name: 'Root',
    component: BasicLayout,
    redirect: { name: 'Home' },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/user-info',
        name: 'UserInfo',
        component: UserInfo,
      },
      {
        path: '/user-bind',
        name: 'UserBind',
        component: UserBind,
      },
      {
        path: '/career',
        name: 'Career',
        component: Career,
      },
      {
        path: '/career/:id',
        name: 'CareerCourse',
        component: CareerCourse,
      },
      {
        path: '/project',
        name: 'Project',
        component: Project,
      },
      {
        path: '/evaluation',
        name: 'Evaluation',
        component: Evaluation,
      },
      {
        path: '/question/:id',
        name: 'Question',
        component: Question,
      },
      {
        path: '/social/bind-wechat',
        name: 'BindWechat',
        component: BindWechat,
      },
      {
        path: '/course/:id',
        name: 'Course',
        component: Course,
      },
    ],
  },
  {
    path: '/course/:courseId/section:sectionId',
    name: 'Section',
    component: Section,
  },
];

export default routes;
