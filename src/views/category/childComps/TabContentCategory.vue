<template>
  <scroll class="tab-content-category" :probe-type="3" :pull-up-load="true">
    <div class="container">
      <a href=""
         class="item"
         v-for="item in subcategories"
         :key="item.image"
         @click.prevent="itemClick(item.title)"
      >
        <img class="item-img" :src="item.image" alt="" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll"

export default {
  name: "TabContentCategory",
  components: {
    Scroll
  },
  props: {
    subcategories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(title) {
      this.$router.push('/search/' + title)
    }
  }
}
</script>

<style scoped>
.tab-content-category {
  height: 100%;
  margin-left: 3px;
  background-color: #fff;
}

.container {
  padding: 8px 4px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.item {
  text-align: center;
  font-size: 12px;
  padding: 10px;
  max-width: 33.33%;
}
.item-img {
  width: 70px;
  height: 70px;
}
.item-text {
  margin-top: 5px;
}
</style>