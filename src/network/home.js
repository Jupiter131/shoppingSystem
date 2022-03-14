// 管理首页home 的请求
import { requestNode } from './request'

// 获取轮播图
export function getSwiper() {
  return requestNode({
    url: '/swiper'
  })
}

// 获取商品数据
export function getHomeGoods(type, page) {
  return requestNode({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}

// 添加或取消收藏
export function collect(username, iid) {
  return requestNode({
    url: '/collect',
    data: {
      username,
      iid
    }
  })
}