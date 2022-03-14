// 登录login 和 注册register 的请求
import { requestNode } from './request'

// 登录
export function login(username, password) {
  return requestNode({
    url: '/login',
    data: {
      username,
      password
    }
  })
}

// 注册
export function register(username, password, email) {
  return requestNode({
    url: '/register',
    data: {
      username,
      password,
      email
    }
  })
}

// 验证用户名
export function usernameCheck(username) {
  return requestNode({
    url: '/register/username',
    data: {
      username
    }
  })
}