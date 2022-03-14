const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const dbName = 'supermall'

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到路由容器中
router.post('/swiper', async(req, res) => { // 获取轮播图数据
  let client = null
  let obj = {
    swiper: [],
    recommend: []
  }
  try {
    client = await MongoClient.connect(url)
    const swiper = client.db(dbName).collection('swiper')
    obj.swiper = await swiper.find().toArray()
    const recommend = client.db(dbName).collection('recommend')
    obj.recommend = await recommend.find().toArray()
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/login', async(req, res) => { // 登录
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let result = await users.find(req.body).project({
        _id: 0,
        password: 0
      }).toArray()
      // console.log(result)
    if (result && result.length === 1) {
      obj.ok = true
      obj.info = result[0]
    }
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/register', async(req, res) => { // 注册
  let client = null
  let ok = false
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let result = await users.find(req.body).toArray()
      // console.log(result)
    let item = req.body
    item.collections = []
    item.card = []
    if (result === null || result.length === 0) {
      await users.insertOne(item)
      ok = true
    } else {
      ok = false
    }
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(ok)
  }
})

router.post('/register/username', async(req, res) => { // 验证用户名
  let client = null
  let ok = false
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let result = await users.find(req.body).toArray()
      // console.log(result)
    if (result === null || result.length === 0) ok = true
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(ok)
  }
})

router.post('/home/data', async(req, res) => { // 获取首页数据
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
      // console.log(req.body.type)
    const products = client.db(dbName).collection('products')
      // console.log(req.body.page)
    let result = null
    switch (req.body.type) {
      case 'sell':
        result = await products.find({
          sell: true
        }).skip(12 * req.body.page - 12).limit(12).toArray()
        break
      case 'pop':
        result = await products.find({
          pop: true
        }).skip(12 * req.body.page - 12).limit(12).toArray()
        break
      case 'new':
        result = await products.find({
          new: true
        }).skip(12 * req.body.page - 12).limit(12).toArray()
        break
    }
    result.sort(() => Math.random() - 0.5)
      // console.log(result)
    obj.ok = true
    obj.list = result
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/collect', async(req, res) => { // 收藏
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
    const products = client.db(dbName).collection('products')
      // console.log(req.body)
    let result = await users.findOne({
        username: req.body.username
      })
      // console.log(result)
    obj.collections = result.collections
    let ind = obj.collections.findIndex(item => item === req.body.iid)
    if (ind === -1) {
      await products.updateOne({
        iid: req.body.iid
      }, {
        $inc: {
          cfav: 1
        }
      })
      obj.message = '收藏成功'
      obj.collections.push(req.body.iid)
    } else {
      await products.updateOne({
        iid: req.body.iid
      }, {
        $inc: {
          cfav: -1
        }
      })
      obj.message = '取消收藏成功'
      obj.collections.splice(ind, 1)
    }
    await users.updateOne({
      username: req.body.username
    }, {
      $set: {
        collections: obj.collections
      }
    })
  } catch (err) {
    console.log("错误：" + err.message)
    obj.message = '服务器错误'
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/detail', async(req, res) => { // 商品详情
  let client = null
  let result = null
  try {
    client = await MongoClient.connect(url)
    const details = client.db(dbName).collection('details')
      // console.log(req.body.iid)
    result = await details.findOne({
        iid: req.body.iid
      })
      // console.log(result)
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(result)
  }
})

router.post('/card/add', async(req, res) => { // 添加购物车
  let client = null
  let ok = false
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    await users.updateOne({
      username: req.body.username
    }, {
      $push: {
        card: req.body
      }
    })
    ok = true
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(ok)
  }
})

router.post('/card/inc', async(req, res) => { // 商品数量+1
  let client = null
  let ok = false
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let user = await users.findOne({
      username: req.body.username
    })
    let arr = user.card
      // console.log(arr)
    let item = arr.find(item => item.iid === req.body.iid)
      // console.log(item)
    item.count++
      await users.updateOne({
        username: req.body.username
      }, {
        $set: {
          card: arr
        }
      })
    ok = true
  } catch (err) {
    console.log("错误：" + err.message)
  } finally {
    if (client != null) client.close()
    res.send(ok)
  }
})

router.post('/card/delete', async(req, res) => { // 删除购物车
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let user = await users.findOne({
      username: req.body.username
    })
    let arr = user.card
      // console.log(arr)
    let ind = arr.findIndex(item => item.iid === req.body.iid)
      // console.log(ind)
    if (ind !== -1) {
      arr.splice(ind, 1)
      await users.updateOne({
        username: req.body.username
      }, {
        $set: {
          card: arr
        }
      })
      obj.cartList = arr
      obj.ok = true
    } else {
      obj.ok = false
    }
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/card/change', async(req, res) => { // 修改购物车
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let user = await users.findOne({
      username: req.body.username
    })
    let arr = user.card
      // console.log(arr)
    let item = arr.find(item => item.iid === req.body.iid)
      // console.log(item)
    item.count = req.body.count <= 0 ? 1 : req.body.count
    await users.updateOne({
      username: req.body.username
    }, {
      $set: {
        card: arr
      }
    })
    obj.count = item.count
    obj.ok = true
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/search', async(req, res) => { // 查找商品
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const products = client.db(dbName).collection('products')
      // console.log(req.body)
    let arr = await products.find().toArray()
      // console.log(arr)
    let list = arr.filter(item => {
        return item.title.includes(req.body.key)
      })
      // console.log(list)
    obj.list = list
    obj.ok = true
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

router.post('/collection', async(req, res) => { // 获取收藏列表数据
  let client = null
  let obj = {}
  try {
    client = await MongoClient.connect(url)
    const users = client.db(dbName).collection('users')
      // console.log(req.body)
    let user = await users.findOne({
      username: req.body.username
    })
    let iids = user.collections
      // console.log(iids)
    let len = iids.length
    let list = []
    const products = client.db(dbName).collection('products')
    for (let i = 0; i < len; i++) {
      let item = await products.findOne({
        iid: iids[i]
      })
      if (item) list.push(item)
    }
    // console.log(list)
    obj.list = list
    obj.ok = true
  } catch (err) {
    console.log("错误：" + err.message)
    obj.ok = false
  } finally {
    if (client != null) client.close()
    res.send(obj)
  }
})

// 3. 把router导出
module.exports = router