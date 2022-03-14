<template>
  <div class="login-input">
    <p class="top">Welcome</p>
    <form autocomplete="off" @submit="submit">
      <label class="username">
        <span>账号</span>
        <input type="text" v-model="username" placeholder="字母开头，不少于6位" @blur="checkUsername">
      </label>
      <label class="password">
        <span>密码</span>
        <input type="password" v-model="password" placeholder="不少于6位" @blur="checkPassword">
      </label>
      <label class="password2">
        <span>再次密码</span>
        <input type="password" v-model="password2" placeholder="再次输入密码" @blur="checkPasswordAgain">
      </label>
      <label class="email">
        <span>邮箱</span>
        <input type="text" v-model="email" placeholder="输入正确邮箱" @blur="checkEmail">
      </label>
      <input type="submit" value="注册">
      <p class="register">
        已有账号？<a href="" @click="returnLogin">立即登录</a>
      </p>
    </form>
  </div>
</template>
<script>
import {register, usernameCheck} from "@/network/login"

export default {
  name: "LoginInput",
  data() {
    return {
      username: '',
      f1: '',
      password: '',
      f2: '',
      password2: '',
      f3: '',
      email: '',
      f4: '',
      lock: true
    }
  },
  methods: {
    submit(event) {
      event.preventDefault()
      this.lock = false
      if (this.f1 !== true) {
        this.f1 && this.$toast.show(this.f1)
      } else if(this.f2 !== true) {
        this.f2 && this.$toast.show(this.f2)
      } else if(this.f3 !== true) {
        this.f3 && this.$toast.show(this.f3)
      } else if(this.f4 !== true) {
        this.f4 && this.$toast.show(this.f4)
      } else {
        register(this.username, this.password, this.email).then(
          res => {
            if (res.data === true) {
              localStorage.setItem('supermallUsername', this.username)
              this.$toast.show('注册成功，正在跳转到登录...')
              setTimeout(() => {
                this.$router.back()
              }, 2000)
            } else {
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
    checkUsername() {
      let reg = /^[a-zA-Z]\w{5,15}$/
      if (this.username === '') {
        this.f1 = ''
      } else if (!reg.test(this.username)) {
        this.f1 = '用户名不符合要求'
        this.$toast.show('用户名不符合要求')
      } else {
        usernameCheck(this.username).then(
          res => {
            if (!res.data) {
              this.f1 = '用户名已存在'
              this.$toast.show('用户名已存在')
            } else {
              this.f1 = true
            }
          },
          err => {
            this.f1 = '服务器错误'
            this.$toast.show('服务器错误')
          }
        )
      }
    },
    checkPassword() {
      let reg = /^\w{6,16}$/
      if (this.password === '') {
        this.f2 = ''
      } else if (!reg.test(this.password)) {
        this.f2 = '密码不符合要求'
        this.$toast.show('密码不符合要求')
      } else {
        this.f2 = true
      }
    },
    checkPasswordAgain() {
      if (this.password2 === '') {
        this.f3 = ''
      } else if (this.password2 !== this.password) {
        this.f3 = '两次密码输入不一致'
        this.$toast.show('两次密码输入不一致')
      } else {
        this.f3 = true
      }
    },
    checkEmail() {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (this.email === '') {
        this.f4 = ''
      } else if (!reg.test(this.email)) {
        this.f4 = '邮箱不存在'
        this.$toast.show('邮箱不存在')
      } else {
        this.f4 = true
      }
    },
    returnLogin(event) {
      event.preventDefault()
      this.$router.back()
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
.top {
  margin: 60px 0 30px;
  font-size: 42px;
  color: rgb(224, 69, 69);
}
label {
  display: block;
  margin: 10px auto 0;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 25px;
  width: 280px;
  display: flex;
}
label span {
  display: inline-block;
  width: 80px;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  color: #383838;
}
input,
input:focus {
  border: none;
  outline: none;
  outline-offset: 0;
  background: none;
}
input::placeholder {
  font-size: 14px;
}
input[type="text"],
input[type="password"] {
  font-size: 18px;
  color: #6c6c6c;
  width: calc(100% - 80px);
}
input[type="submit"] {
  margin-top: 25px;
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
  margin-top: 20px;
  font-size: 15px;
  text-align: right;
  font-weight: bold;
}
.find a,
.register a {
  color: rgb(224, 54, 54);
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