<template>
  <div class="search-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div>搜索结果</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "SearchNavBar",
  components: {
    NavBar,
  },
  methods: {
    backClick() {
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.search-nav-bar {
  background-color: #FF2D2D;
  color: #fff;
}
.back img {
  margin-top: 12px;
}
</style>