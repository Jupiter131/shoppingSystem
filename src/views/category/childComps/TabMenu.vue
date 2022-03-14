<template>
  <scroll class="tab-menu" :probe-type="3" :pull-up-load="true">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in categories"
           :key="index"
           :class="{ active: index === currentIndex }"
           @click="itemClick(index)">
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll"

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("itemClick", index)
    }
  }
}
</script>

<style scoped>
.tab-menu {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}

.menu-list {
  padding: 8px 0;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.menu-list-item.active {
  color: var(--color-high-text);
  font-weight: 700;
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>