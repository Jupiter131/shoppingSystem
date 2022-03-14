<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    //父组件Home.vue传给<scroll>组件
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //此处不写死，转为props中的数据
      probeType: this.probeType, //实时监听滚动位置，
      pullUpLoad: this.pullUpLoad, //上拉加载更多
      click: true,
    });
    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        //console.log(position);
        this.$emit("scroll", position); //子传父，自定义事件
      });
    }
    //3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        //console.log("上拉加载更多");
      });
    }
  },
  methods: {
    // scrollTo(x, y, time = 1000) {
    //   this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    // },
    // finishPullUp() {
    //   this.scroll && this.scroll.finishPullUp();
    // },
    refresh() {
      // console.log("Scroll.vue中的refresh()刷新-----");
      this.scroll && this.scroll.refresh(); 
    }, //Home.vue中88行就可以用this.$refs.scroll.refresh();
    // getScrollY() {
    //   //记录home离开时的位置
    //   return this.scroll ? this.scroll.y : 0;
    // },
  },
};
</script>

<style scoped>
</style>