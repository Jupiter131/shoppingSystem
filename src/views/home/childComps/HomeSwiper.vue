<template>
  <!-- 轮播图 start-->
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a href="" @click="swiperClick">
        <img :src="item.address" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return { isLoad: false };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      //为了不发送4次事件
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
    swiperClick(event) {
      event.preventDefault()
      this.$toast.show('功能暂未开放')
    }
  },
};
</script>

<style scoped>
</style>