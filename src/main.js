import Vue from 'vue'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import axios from 'axios'
import Vuex from 'vuex'

import '../static/common/css/reset.css'
import '../static/common/css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/app.less'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(Vuex)
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';// 配置请求头
Vue.prototype.$http.defaults.withCredentials = true; //请求携带cookie
// Vue.prototype.$http.crossDomain = true; //请求携带额外数据(不包含cookie)


import router from './router'
import store from "./store"
import filter from "./filter"
import App from './App'
import '../static/common/js/main'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    //store.state.isLogin 判断条件
    if (true) {  // 判断当前的token是否存在
      // console.log('登录信息正确的')
      document.title = to.meta.title
      next();
    }
    else {
      // console.log('登录信息错误的接口')
      alert('请登录')
      document.title = '登录'
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    document.title = to.meta.title
    next();
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
