import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// Toast插件方式的封装
import toast from './components/common/toast'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue();

// 安装toast插件,就会执行install
Vue.use(toast);

// 图片懒加载
Vue.use(VueLazyLoad);

// 解决移动端300ms的延迟
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')