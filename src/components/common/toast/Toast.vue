<template>
  <div class="toast" v-show="isShow">
    <!-- 需要父组件Detail传过来isShow,message -->
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    // Toast.vue的插件方式的封装
    return {}
  },
  methods: {
    // Toast.vue的插件方式的封装
    show(message, duration=2000) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ""
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  font-size: 15px;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 12px 16px;
  z-index: 999;
}
</style>