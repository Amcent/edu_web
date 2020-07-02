import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import DataStore from '@/global/storage/index';
import Store from '@/store/index';
import userService from '@/global/services/user';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.firstInit = false;

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const TOKEN = DataStore.getToken();
  console.log('TOKEN', TOKEN);

  if (!TOKEN && to.name !== 'Login') {
    console.log('no');
    next({ name: 'Login', replace: true });
    NProgress.done();
    return;
  }

  if (TOKEN && to.name === 'Login') {
    console.log(TOKEN);
    next({ name: 'Home', replace: true });
    NProgress.done();
    return;
  }

  if (TOKEN && !router.firstInit) {
    router.firstInit = true;

    try {
      const user = await userService.show();

      if (!user) {
        DataStore.removeToken();
        window.location.reload();
      }

      Store.commit('updateUserInfo', user || {});
    } catch {
      next();
    }
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
