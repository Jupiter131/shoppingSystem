<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left" class="icon">
        <img src="../../assets/img/home/icon.png" alt="" />
      </div>
      <div slot="center">
        <div id="container">
          <div class="search bar">
            <form @submit="search">
              <input
                type="text"
                placeholder="请输入您要搜索的内容..."
                class="holder"
                v-model="searchTxt"
              />
              <button class="sousuo">搜索</button>
            </form>
          </div>
        </div>
      </div>
    </nav-bar>

    <!-- 为了吸顶效果，复制一份到<scroll>外面 -->
    <tab-control
      :titles="['新品', '流行', '热卖']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
      ref="tabcontrol1"
    />

    <!-- 使用better-scroll -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />

      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends" @swiperImageLoad="swiperImageLoad" />

      <!-- 流行、新款、精选 -->
      <tab-control
        ref="tabcontrol2"
        :titles="['新品', '流行', '热卖']"
        @tabClick="tabClick"
      />
      <!-- 流行、新款、精选的数据-->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import { getSwiper, getHomeGoods } from "@/network/home";

import { debounce } from "@/common/utils";
import { itemImageListenerMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemImageListenerMixin],
  data() {
    return {
      banners: [], //取出数据插入<swiper-item>
      recommends: [], //<recommend-view>
      goods: {
        new: { page: 0, list: [] },
        pop: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "new",
      isShowBackTop: false,
      tabOffetTop: 0,
      isTabFixed: false,
      saveY: 0,
      searchTxt: '',
      lock: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //这两个生命周期函数在<keep-alive>切换时才生成
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 500);
    this.$refs.scroll.refresh(); //refresh()方法在Scroll.vue中
  },
  deactivated() {
    //1.保存首页离开时的Y值
    this.saveY = this.$refs.scroll.scroll.y;
    //或this.$refs.scroll.getScrollY(); getScrollY()方法在Scroll.vue中

    //2.取消GoodsListItem中img加载传过来的监听事件
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  created() {
    // 生命周期函数，组件创建完就要发送网络请求（调用methods的函数）
    this.getSwiper()              // 轮播图
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")     // 商品数据
  },
  mounted() {
    this.$bus.$on("itemImageLoad", this.pack)
  },
  methods: {
    /**
     * 搜索
     */
    search(event) {
      event.preventDefault()
      this.$router.push('/search/' + this.searchTxt)
    },
    /**
     * 网络请求相关的方法
     */
    // 1.请求轮播图数据 和 下边的
    getSwiper() {
      getSwiper().then(res => {
        this.banners = res.data.swiper
        this.recommends = res.data.recommend
      })
    },
    // 2.请求'流行', '新款', '精选'的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 下一次上拉加载更多
        this.$refs.scroll.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "new";
          break;
        case 1:
          this.currentType = "pop";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },

    // better-scroll的方法，点击返回顶部
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
      // this.$refs.scroll.scrollTo(0, 0);
    },

    // 用Scoll.vue，<scroll>
    contentScroll(position) {
      //1.<back-top>的显示与隐藏
      this.isShowBackTop = -position.y > 1000;
      //2.决定<tab-control>是否吸顶
      this.isTabFixed = -position.y > this.tabOffetTop;
    },

    // 用Scoll.vue,<scroll>中的方法，上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    swiperImageLoad() {
      this.tabOffetTop = this.$refs.tabcontrol2.$el.offsetTop;
    },

    pack() {
      this.lock && clearTimeout(this.lock)
      this.lock = setTimeout(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      }, 200)
    },
  },
};
</script>

<style scoped>
.icon img {
  margin-top: 4px;
  margin-left: 15px;
}

#home {
  /*padding-top: 44px;*/
  height: 100vh; /* 视口高度100% ,用better-scroll*/
  position: relative; /* 用better-scroll*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /* 不用better-scroll */
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

/* 用better-scroll */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
body {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-family: "Microsoft YaHei", "宋体", "Segoe UI", "Lucida Grande", Helvetica,
    Arial, sans-serif, FreeSans, Arimo;
}

#container {
  margin-top: 5px;
  width: 285px;
  height: 32px;
}

form {
  position: relative;
  width: 285px;
  margin-right: 15px;
}

input,
button {
  border: none;
  outline: none;
}

input {
  width: 100%;
  height: 32px;
  padding-left: 13px;
}

button {
  height: 32px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}

.bar {
  margin-left: 10px;
  margin-top: 6px;
  background: var(--color-lint);
}

.bar form {
  height: 32px;
}

.bar input {
  width: 0;
  padding: 0 32px 0 15px;
  border-bottom: 2px solid transparent;
  background: transparent;
  transition: 0.3s linear;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.bar input:focus {
  border: solid;
  border-width: 1.5px;
  border-color: white;
  width: 280px;
  z-index: 1;
}

.bar button {
  background: var(--color-lint);
  border: solid;
  border-color: white;
  border-width: 1.5px;
  top: 0;
  right: 0;
}

.sousuo {
  color: white;
  font-size: 14px;
}

.holder {
  font-size: 14px;
}

.icon img {
  margin-left: 8px;
}
</style>