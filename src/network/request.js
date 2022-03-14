import axios from 'axios'

export function request(config) {
    // 创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // 请求拦截
    instance.interceptors.request.use(
        config => {
            return config
        },
        err => {
            console.log(err)
        }
    )

    // 响应拦截
    instance.interceptors.response.use(
        res => {
            return res.data
        },
        err => {
            console.log(err)
        }
    )

    // 本身返回值就是一个promise,所以直接return
    return instance(config)
}

export function requestNode(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000/',
        method: 'POST',
        timeout: 5000
    })
    return instance(config)
}