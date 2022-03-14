const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 允许跨域访问
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Headers', 'Content-type')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
  next()
})

// 配置静态资源
app.use('/static', express.static(path.join(__dirname, 'public')))

// 解析POST参数
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由
const router = require('./router/index.js')
app.use(router)

// 首页
router.get('/', (req, res) => {
  res.send('首页')
})

// 配置处理404状态的中间件
app.use((req, res) => {
  res.redirect(301, '/')
})

// 配置全局错误处理中间件
app.use(function(err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000, function() {
  console.log('app is running 3000...')
})
