<template>
  <div id="register">
    <register-nav-bar title="注册" @back="back">
      <img src="~@/assets/img/common/back.svg" alt="" />
    </register-nav-bar>
    <register-input />
  </div>
</template>

<script>
import RegisterNavBar from "./childComps/LoginNavBar"
import RegisterInput from "./childComps/RegisterInput"

export default {
  name: "Register",
  components: {
    RegisterNavBar,
    RegisterInput
  },
  data() {
    return {}
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
#register {
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: url("~@/assets/img/login/background.jpg") no-repeat center/cover #fff;
}
</style>