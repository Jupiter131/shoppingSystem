export default {
  userCollection(state) {
    return state.user.collections
  },
  userUsername(state) {
    return state.user.username
  },
  userEmail(state) {
    return state.user.email
  },
  cartList(state) {
    return state.cartList
  },
  cartLength(state) {
    return state.cartList.length;
  }
}