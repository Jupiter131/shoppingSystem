<template>
  <div id="shop-item" @click="itemClick">
    <div class="item-selector">
      <!-- mutations.js中添加了payload.checked = true -->
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick" />
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">
          <div v-show="!isInput" class="basic" @click.stop="inputClick">x{{ itemInfo.count }}</div>
          <div v-show="isInput" class="input-count">
            <div class="delete" @click.stop="deleteCart">删除</div>
            <div class="count" @click.stop="">
              <div class="sub" @click="subCart">-</div>
              <input type="text" class="num" v-model.number="count" @change="changeCart" :key="itemInfo.iid">
              <div class="add" @click="addCart">+</div>
            </div>
            <img src="~@/assets/img/shopcart/tick.svg" alt="" class="img" @click.stop="inputBack">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    itemInfo: {
      //itemInfo就是CartList.vue中遍历$store.state.cartList的item
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 1,
      isInput: false,
      lock: true
    }
  },
  mounted() {
    this.count = this.itemInfo.count
  },
  methods: {
    checkClick(event) {
      event.stopPropagation()
      this.itemInfo.checked = !this.itemInfo.checked;
    },
    inputClick() {
      this.isInput = true
    },
    inputBack() {
      this.isInput = false
    },
    deleteCart() {
      if (!this.lock) return
      this.lock = false
      this.$store.dispatch("deleteCart", this.itemInfo).then(
        res => {
          this.$toast.show(res)
          this.lock = true
        },
        err => {
          this.$toast.show(err)
          this.lock = true
        }
      )
    },
    subCart() {
      if (!this.lock) return
      this.lock = false
      if (this.count <= 1) {
        this.$toast.show('商品数量最少为1')
        this.lock = true
      } else {
        this.itemInfo.newCount = this.itemInfo.count - 1
        this.$store.dispatch("changeCart", this.itemInfo).then(
          res => {
            this.$toast.show(res)
            this.count = this.itemInfo.count
            this.lock = true
          },
          err => {
            this.$toast.show(err)
            this.lock = true
          }
        )
      }
    },
    addCart() {
      if (!this.lock) return
      this.lock = false
      this.itemInfo.newCount = this.itemInfo.count + 1
      this.$store.dispatch("changeCart", this.itemInfo).then(
        res => {
          this.$toast.show(res)
          this.count = this.itemInfo.count
          this.lock = true
        },
        err => {
          this.$toast.show(err)
          this.lock = true
        }
      )
    },
    changeCart(event) {
      if (!this.lock) {
        this.count = this.itemInfo.count
        return
      }
      this.lock = false
      if (Number(this.count) && this.count >= 1) {
        this.itemInfo.newCount = this.count
        this.$store.dispatch("changeCart", this.itemInfo).then(
          res => {
            this.$toast.show(res)
            event.srcElement.blur()
            this.lock = true
          },
          err => {
            this.$toast.show(err)
            this.lock = true
          }
        )
      } else {
        this.$toast.show('请检查输入')
        this.lock = true
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.itemInfo.iid)
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
}

.info-bottom .item-price {
  color: orangered;
}

.info-bottom .item-count .basic {
  border: 1px solid #6C6C6C;
  font-size: 14px;
  color: #3C3C3C;
  padding: 2px 5px;
  border-radius: 4px;
}

.info-bottom .item-count .input-count {
  display: flex;
  width: 140px;
  height: 22px;
  justify-content: space-between;
  text-align: center;
}

.info-bottom .item-count .input-count .delete {
  font-size: 14px;
  line-height: 20px;
  color: #FF5151;
}

.info-bottom .item-count .input-count .count {
  display: flex;
}

.info-bottom .item-count .input-count .count>div {
  width: 20px;
  height: 20px;
  font-size: 16px;
  border: 1px solid #6C6C6C;
}

.info-bottom .item-count .input-count .count .sub {
  border-radius: 5px 0 0 5px;
}

.info-bottom .item-count .input-count .count .add {
  border-radius: 0 5px 5px 0;
}

.info-bottom .item-count .input-count .count .num {
  width: 30px;
  height: 20px;
  border: none;
  border-top: 1px solid #6C6C6C;
  border-bottom: 1px solid #6C6C6C;
  outline: none;
  outline-offset: 0;
  text-align: center;
  font-size: 14px;
  color: #3C3C3C;
}

.info-bottom .item-count .input-count .img {
  width: 16px;
  height: 16px;
  margin-top: 2px;
}
</style>