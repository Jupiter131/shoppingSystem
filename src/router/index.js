import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () =>
  import ('@/views/home/Home')
const Category = () =>
  import ('@/views/category/Category')
const Shopcart = () =>
  import ('@/views/shopcart/Shopcart')
const Profile = () =>
  import ('@/views/profile/Profile')

const Detail = () =>
  import ('@/views/detail/Detail')

const Login = () =>
  import ('@/views/login/Login')
const Register = () =>
  import ('@/views/login/Register')

const Search = () =>
  import ('@/views/search/Search')

const Collection = () =>
  import ('@/views/collection/Collection')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//1.安装插件
Vue.use(VueRouter);

const routes = [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/search/:txt',
    component: Search
  },
  {
    path: '/collection',
    component: Collection
  }
]

//2.创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;