<template>
  <div class="collection">
    <Collection-nav-bar/>
    
    <!-- 使用better-scroll -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      v-if="goods.length"
    >
      <goods-list :goods="goods" />
    </scroll>
    <div v-else class="none">非常抱歉！没有数据！</div>
  </div>
</template>

<script>
import CollectionNavBar from "./childComps/CollectionNavBar"
import GoodsList from "@/components/content/goods/GoodsList"
import Scroll from "@/components/common/scroll/Scroll"
import BackTop from "@/components/content/backTop/BackTop"

import { collection } from "@/network/collection"

export default {
  name: "Collection",
  components: {
    CollectionNavBar,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // console.log(this.$store.getters.userUsername)
    collection(this.$store.getters.userUsername).then(
      res => {
        this.goods = res.data.list
        // console.log(res.data.list)
      },
      err => {
        this.$toast.show('服务器错误')
      }
    )
  },
  data() {
    return {
      goods: [],
      lock: null
    }
  },
  methods: {
    pack() {
      this.lock && clearTimeout(this.lock)
      this.lock = setTimeout(() => {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      }, 200)
    }
  },
  mounted() {
    this.$bus.$on("itemImageLoad", this.pack)
  }
}
</script>

<style scoped>
.collection {
  height: 100vh;
}

.content {
  background: #fff;
  overflow: hidden;
  position: absolute;
  top: 48px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.none {
  text-align: center;
  line-height: calc(100vh - 100px);
}
</style>