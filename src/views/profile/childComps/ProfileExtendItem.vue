<template>
  <div class="profile-extend-item" @click="extendClick(title)">
    <div class="info">{{title}}</div>
    <span class="text">{{desc}}</span>
  </div>
</template>

<script>
export default {
  name: "ProfileExtendItem",
  props: {
    title: String,
    desc: String
  },
  methods: {
    extendClick(title) {
      this.$toast.show(title + '功能暂未开发')
    }
  }
}
</script>

<style scoped>
.profile-extend-item {
  padding: 12px 30px 12px 16px;
  margin-bottom: 2px;
  background: #fff;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info {
  font-size: 15px;
}
.text {
  font-size: 13px;
}
.text::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  margin-top: -1px;
  right: 12px;
  background: url("~@/assets/img/profile/tick.svg") no-repeat center/contain;
}
</style>