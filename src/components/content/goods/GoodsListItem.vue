<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect" :class="{collected: isCollected}" @click="collect">{{coll}}</span>
    </div>
  </div>
</template>

<script>
import { collect } from "@/network/home"
import { UPDATE_COLLECTION } from '@/store/mutation-types'

export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      lock: true
    }
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.image ||
        this.goodsItem.show.img ||
        this.goodsItem.show.image ||
        this.goodsItem.img
      )
    },
    isCollected() {
      return this.$store.getters.userCollection.some(item => item === this.goodsItem.iid)
    },
    coll() {
      return this.goodsItem.cfav + (this.isCollected ? 1 : 0)
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad")
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid)
    },
    collect(event) {
      event.stopPropagation()
      if (this.lock) {
        this.lock = false
        // 添加或取消收藏
        collect(this.$store.getters.userUsername, this.goodsItem.iid).then(
          res => {
            // console.log(res.data)
            this.$toast.show(res.data.message)
            this.$store.commit(UPDATE_COLLECTION, res.data.collections)
          },
          err => {
            console.log(res)
            this.$toast.show('服务器错误')
          }
        ).finally(() => {
          this.lock = true
        })
      }
    }
  }
}
</script>

<style scoped>
.goods-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
}

.goods-info .collected::before {
  background-image: url("~@/assets/img/common/collected.svg");
}
</style>