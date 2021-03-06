import { request, requestNode } from './request'

// 获取商品详情
export function getDetail(iid) {
  return requestNode({
    url: '/detail',
    data: {
      iid
    }
  })
}

// 获取推荐商品
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 加入购物车
export function addToCart(username, product) {
  return requestNode({
    url: '/card/add',
    data: {
      username,
      iid: product.iid,
      image: product.image,
      title: product.title,
      desc: product.desc,
      price: product.price,
      checked: product.checked,
      count: 1
    }
  })
}

// 购物车商品数量+1
export function incCart(username, iid) {
  return requestNode({
    url: '/card/inc',
    data: {
      username,
      iid
    }
  })
}

//详情页轮播图下边的基本信息数据封装为一个类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//详情页中商家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


//详情页中商品参数信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}