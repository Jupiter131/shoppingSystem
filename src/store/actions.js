import { addToCart, incCart } from '@/network/detail'
import { deleteToCart, changeToCart } from '@/network/shopcart'
import { ADD_COUNTER, ADD_TO_CART, DELETE_TO_CART, CHANGE_TO_CART } from './mutation-types'

export default {
  // 添加或购物车数量+1
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.新添加的商品payload
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 2.判断是否有oldProduct
      if (oldProduct) {
        incCart(payload.username, payload.iid).then(
          res => {
            context.commit(ADD_COUNTER, oldProduct)
            resolve('商品已存在，数量加1')
          },
          err => {
            reject('服务器错误')
          }
        )
      } else {
        payload.checked = true
        payload.count = 1
        addToCart(payload.username, payload).then(
          res => {
            context.commit(ADD_TO_CART, payload)
            resolve('商品添加成功')
          },
          err => {
            reject('服务器错误')
          }
        )
      }
    })
  },
  // 删除购物车
  deleteCart(context, payload) {
    return new Promise((resolve, reject) => {
      deleteToCart(payload.username, payload.iid).then(
        res => {
          context.commit(DELETE_TO_CART, res.data.cartList)
          resolve('商品删除成功')
        },
        err => {
          reject('服务器错误')
        }
      )
    })
  },
  // 修改购物车
  changeCart(context, payload) {
    return new Promise((resolve, reject) => {
      changeToCart(payload.username, payload.iid, payload.newCount).then(
        res => {
          payload.newCount = res.data.count
          context.commit(CHANGE_TO_CART, payload)
          resolve('商品数量修改成功', 1000)
        },
        err => {
          reject('服务器错误')
        }
      )
    })
  }
}