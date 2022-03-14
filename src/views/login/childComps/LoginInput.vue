<template>
  <div class="login-input">
    <div class="avatar">
      <img src="~@/assets/img/login/avatar.jpg" alt="">
    </div>
    <form autocomplete="off" @submit="submit">
      <label class="username">
        <img src="~@/assets/img/login/username.png" alt="">
        <input type="text" v-model="username">
      </label>
      <label class="password">
        <img src="~@/assets/img/login/password.png" alt="">
        <input type="password" v-model="password">
      </label>
      <p class="find">
        <a href="" @click="findPassword">找回密码</a>
      </p>
      <input type="submit" value="登录">
      <p class="register">
        还没账号？<a href="" @click="register">立即注册</a>
      </p>
    </form>
  </div>
</template>

<script>
import {login} from "@/network/login"
import {ADD_USER} from "@/store/mutation-types"

export default {
  name: "LoginInput",
  data() {
    return {
      username: '',
      password: '',
      lock: true
    }
  },
  mounted() {
    let username = localStorage.getItem('supermallUsername')
    if (username) this.username = username
  },
  methods: {
    submit(event) {
      event.preventDefault()
      this.lock = false
      if (this.username.trim() === '' || this.password.trim() === '') {
        this.$toast.show('输入不合法')
        this.lock = true
      } else {
        login(this.username, this.password).then(
          res => {
            if (res.data.ok === true) {
              localStorage.setItem('supermallUsername', this.username)
              this.$toast.show('登录成功，请稍等...')
              setTimeout(() => {
                console.log(res.data.info)
                this.$store.commit(ADD_USER, res.data.info)
                this.$router.push('/home')
              }, 2000);
            } else {
              this.$toast.show('账号或密码错误')
            }
          },
          err => {
            this.$toast.show('服务器错误')
          }
        ).finally(() => {
          this.lock = true
        })
      }
    },
    findPassword(event) {
      event.preventDefault()
      this.$toast.show('功能暂未开放')
    },
    register(event) {
      event.preventDefault()
      this.$router.push('/register')
    }
  }
};
</script>

<style scoped>
.login-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 44px);
}
.avatar {
  border-radius: 50%;
  width: 180px;
  height: 180px;
  overflow: hidden;
  margin-top: 64px;
}
.avatar img {
  width: 100%;
  height: 100%;
}
label {
  display: block;
  margin: 20px auto 0;
  height: 40px;
  border-bottom: 2px solid #fff;
  width: 260px;
  display: flex;
  justify-content: space-between;
}
label img {
  width: 26px;
  height: 26px;
  margin-top: 6px;
}
input,
input:focus {
  border: none;
  outline: none;
  outline-offset: 0;
  background: none;
}
input[type="text"],
input[type="password"] {
  font-size: 18px;
  color: #666;
  width: calc(100% - 50px);
}
.find {
  margin-top: 15px;
  font-size: 14px;
  text-align: right;
  font-weight: bold;
  font-family: "宋体";
}
input[type="submit"] {
  margin-top: 20px;
  width: 280px;
  height: 42px;
  border-radius: 21px;
  background: linear-gradient(135deg, #E03636, #FF5151);
  color: #fff;
  font-size: 17px;
  font-weight: bold;
}
input[type="submit"]:hover {
  opacity: .9;
}
input[type="submit"]:active {
  opacity: .8;
}
.register {
  margin-top: 14px;
  font-size: 14px;
  text-align: right;
  font-weight: bold;
  font-family: "宋体";
}
.find a,
.register a {
  color: #E03636;
}
.find a:hover,
.register a:hover {
  opacity: .8;
}
.find a:active,
.register a:active {
  opacity: .6;
}
</style>