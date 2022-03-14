import { requestNode } from './request'

// 删除购物车
export function deleteToCart(username, iid) {
  return requestNode({
    url: '/card/delete',
    data: {
      username,
      iid
    }
  })
}

// 修改购物车
export function changeToCart(username, iid, count) {
  return requestNode({
    url: '/card/change',
    data: {
      username,
      iid,
      count
    }
  })
}