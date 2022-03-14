<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-all"
        @click.native="checkClick"
      />
      <span style="font-size:15px">全选</span>
    </div>
    <div class="price" style="font-size:15px">总计:{{ totalPrice }}</div>
    <div class="calculate" style="font-size:16px" @click="calClick">去结算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked === true;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked === true)
        .length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        return !this.$store.state.cartList.find(
          (item) => item.checked !== true
        );
      }
    }
  },
  methods: {
    checkClick() {
      //true全选按钮选中时，点击则全不选
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        //点击全选
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calClick() {
      this.$toast.show('结算功能暂未开放')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #ddd;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 16px;
}
.check-all {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
  /* price,calculate平分剩余的宽度 */
}
.calculate {
  flex: 1;
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>