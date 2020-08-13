import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'
import http from '@/api/config'
import '@/mock/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$http = http;

router.beforeEach((to, from, next) => {
  // 防止刷新后 vuex 里丢失 token
  store.commit('getToken');
  let token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    });
  } else {
    store.commit('selectMenu', to);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //（在登陆后拥有权限的前提）
    // 防止刷新后 vuex 里丢失侧边栏列表 menu
    // 而且可以在刷新后再次构造动态路由
    store.commit('addMenu', router)
  }
}).$mount('#app')