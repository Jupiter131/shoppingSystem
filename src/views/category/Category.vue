<template>
  <div id="category">
    功能尚未开放
    <!-- <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="container">
      <tab-menu :categories="categories" class="left" @itemClick="selectItem" />
      <tab-content-category :subcategories="subcategories" class="right" />
    </div> -->
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"

import {
  getCategory,
  getSubcategory
} from "@/network/category"

import { tabControlMixin } from "@/common/mixin"

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContentCategory
  },
  mixins: [tabControlMixin],
  data() {
    return {
      currentIndex: 0,
      categories: [],         // 传给子组件TabMenu.vue
      subcategories: []       // 传给子组件TabContentCategory.vue
    }
  },
  created() {
    // this._getCategory()
  },
  methods: {
    // 左侧分类栏数据
    _getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.category.list
        this._getSubcategories(0)
      })
    },
    // 右侧分类包含的具体类型
    _getSubcategories(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      getSubcategory(mailKey).then(
        res => {
          this.subcategories = res.data.list
          // console.log(res.data.list)
        }),
        err => {
          this.$toast.show('服务器错误')
        }
    },
    // 选择分类栏
    selectItem(index) {
      this._getSubcategories(index);
    }
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.container {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
  background: #F0F0F0;
}

.left {
  flex: 2;
}

.right {
  flex: 7;
}
</style>
