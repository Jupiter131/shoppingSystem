<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div @click="btnClick('客服')">
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div @click="btnClick('店铺')">
        <i class="icon shop"></i>
        <span class="text">进店</span>
      </div>
      <div @click="collect">
        <i class="icon select" :class="{selected: isCollected}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
import { collect } from "@/network/home"
import { UPDATE_COLLECTION } from '@/store/mutation-types'

export default {
  name: "DetailBottomBar",
  props: {
    iid: String
  },
  data() {
    return {
      lock: true
    }
  },
  computed: {
    isCollected() {
      return this.$store.getters.userCollection.some(item => item === this.iid)
    }
  },
  methods: {
    // 点击功能
    btnClick(msg) {
      this.$toast.show(msg + '功能暂未开放')
    },
    // 收藏
    collect(event) {
      event.stopPropagation()
      if (this.lock) {
        this.lock = false
        // 添加或取消收藏
        collect(this.$store.getters.userUsername, this.iid).then(
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
    },
    // 加入购物车
    addToCart() {
      this.$emit("addToCart");
    },
    // 购买
    buy() {
      this.$toast.show('购买功能暂未开放')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 49px;
  background-color: #fff;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 2px;
  background: url("~@/assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -53px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-left .selected {
  background-position: 0 -27px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}

.bar-right .cart {
  background-color: orange;
  color: #fff;
}

.bar-right .buy {
  background-color: red;
}

</style>