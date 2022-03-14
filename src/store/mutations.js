import {
  ADD_USER,
  UPDATE_COLLECTION,
  ADD_COUNTER,
  ADD_TO_CART,
  DELETE_TO_CART,
  CHANGE_TO_CART
} from './mutation-types'
import Vue from 'vue'

export default {
  [ADD_USER](state, payload) {
    state.user = payload
    state.cartList = payload.card
  },
  [UPDATE_COLLECTION](state, payload) {
    state.user.collections = payload
  },

  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },

  [DELETE_TO_CART](state, payload) {
    state.cartList = payload
  },
  [CHANGE_TO_CART](state, payload) {
    payload.count = payload.newCount
  }
}