<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- :item-info="item" 传给子组件CartListItem -->
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
    // console.log("购物车列表刷新-----");
  },
};
</script>

<style scoped>
/* 父元素的定位在Shopcart.vue 中.cart */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>