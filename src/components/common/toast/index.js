import Toast from './Toast'

const obj = {}

obj.install = function(Vue) { //install函数默认传参Vue
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  //2.new的方式，创建一个组件对象
  const toast = new toastContrustor();
  //3.将组件对象，手动挂载到一个元素上
  toast.$mount(document.createElement('div'));
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  //5
  Vue.prototype.$toast = toast;

  //console.log('执行了toast/index.js 中的obj.install函数');
}

export default obj; //main.js中引入，安装插件