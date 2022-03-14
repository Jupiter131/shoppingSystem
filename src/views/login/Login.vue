<template>
  <div id="login">
    <login-nav-bar title="登录" />
    <login-input />
  </div>
</template>

<script>
import LoginNavBar from "./childComps/LoginNavBar"
import LoginInput from "./childComps/LoginInput"

export default {
  name: "Login",
  components: {
    LoginNavBar,
    LoginInput
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#login {
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