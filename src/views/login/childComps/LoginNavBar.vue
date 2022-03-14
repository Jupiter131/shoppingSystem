<template>
  <div class="login-nav-bar">
    <div class="left" @click="backClick">
      <slot></slot>
    </div>
    <div class="center">{{title}}</div>
    <div class="right"></div>
  </div>
</template>

<script>

export default {
  name: "LoginNavBar",
  props: {
    title: {
      type: String,
      default: '超超商城'
    }
  },
  methods: {
    backClick() {
      this.$emit('back')
    }
  }
};
</script>

<style scoped>
.login-nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
}
.left,
.right {
  width: 60px;
}
.left img {
  height: 24px;
  width: 24px;
  margin-left: 10px;
  margin-top: 10px;
}
.center {
  flex: 1;
  text-align: center;
  font-size: 16px;
  line-height: 44px;
}
</style>