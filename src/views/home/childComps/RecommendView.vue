<template>
  <div class="recommend">
    <a v-for="(item, index) in recommends" :key="index" href="" @click="itemClick($event, item.name)">
      <img :src="item.address" alt="" @load="imageLoad" />
      <div>{{item.name}}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(event, name) {
      event.preventDefault()
      this.$toast.show(name + '功能暂未开放')
    },
    imageLoad() {
      this.$emit("swiperImageLoad")
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 10px;
}
.recommend a {
  width: 25%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 15px;
}
.recommend a img {
  width: 70%;
  margin-bottom: 4px;
}
</style>