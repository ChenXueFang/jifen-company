import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../my-theme/index.less';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import { post, get }  from "./utils/axios";
Vue.prototype.$get=get;
Vue.prototype.$post=post;

import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

Vue.use(Router)
router.beforeEach((to, from, next) => {
  // debugger
  if (to.path != '/') {
    if (!store.state.user.user || JSON.stringify(store.state.user.user) == "{}") {
        router.push('/');
    } else {
      next(true);
    }
  } else {
    next();
  }
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(iView);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
