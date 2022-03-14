<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailnav"
    />

    <!-- 中间区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 子组件都封装到childComps中 包括detail-nav-bar-->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <!-- <goods-list :goods="recommends" ref="recommend" /> -->
    </scroll>

    <!-- 底部功能栏 -->
    <detail-bottom-bar :iid="iid" @addToCart="addCart" />

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import { getDetail, getRecommend } from "@/network/detail";
import { Goods, Shop, GoodsParam } from "@/network/detail";

import { debounce } from "@/common/utils";
import { itemImageListenerMixin } from "@/common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    BackTop
  },
  mixins: [itemImageListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], //存放四个offsetTop值
      getThemeTopY: null, //函数接收防抖函数
      currentIndex: 0,
      isShowBackTop: false //可以抽到混入里
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      //console.log(res);
      //2.1.获取顶部的轮播图数据,传给子组件DetailSwiper.vue封装轮播图
      this.topImages = res.data.itemInfo.topImages;
      //2.2获取基本信息
      const data = res.data;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //2.3获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //2.4获取商品详情数据
      this.detailInfo = data.detailInfo;
      //2.5获取商品参数数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //2.6获取评论信息的数据第一条
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      //数据展示用GoodsList
    });

    //4.接收debounce函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 500);
  },
  // destroyed() {
  //   this.$bus.$off("itemImageLoad", this.itemImageListener);
  // },
  methods: {
    // 1.当图片都加载完，刷新scroll，获取新的滚动高度
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY(); //加入了防抖函数，只调用函数一次
    },
    // 2.点击标题，滚动到对应内容
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    // 3.滚动内容，显示对应的标题
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 1; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
          //NavBar组件中的currentIndex
        }
      }
      //3.<back-top>的显示与隐藏，不能抽到混入backTopMixin中
      this.isShowBackTop = -position.y > 1000;
    },
    // 4.点击返回顶部，可以抽到混入里
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      //this.$refs.scroll.scrollTo(0, 0);
    },
    // 5.添加进购物车
    addCart() {
      // 1.获取购物车里需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.username = this.$store.getters.userUsername
      // 2.将商品添加到购物车里
      this.$store.dispatch("addCart", product).then(
        res => {
          this.$toast.show(res)
        },
        err => {
          this.$toast.show(err)
        }
      )
    }
  }
}
</script>

<style scoped>
/* 把下边tabbar盖住 */
#detail {
  height: 100vh; /* 100vh为了配和content */
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>