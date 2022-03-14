<template>
  <div class="profile-user-order">
    <slot name="title"></slot>
    <div class="modules">
      <div class="item" @click="moduleClick(name1)">
        <div class="img"><slot name="module1"></slot></div>
        <div class="name">{{name1}}</div>
      </div>
      <div class="item" @click="moduleClick(name2)">
        <div class="img"><slot name="module2"></slot></div>
        <div class="name">{{name2}}</div>
      </div>
      <div class="item" @click="moduleClick(name3)">
        <div class="img"><slot name="module3"></slot></div>
        <div class="name">{{name3}}</div>
      </div>
      <div class="item" @click="moduleClick(name4)">
        <div class="img"><slot name="module4"></slot></div>
        <div class="name">{{name4}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserOrder",
  props: {
    name1: String,
    name2: String,
    name3: String,
    name4: String
  },
  methods: {
    moduleClick(name) {
      if (name === '我的收藏') {
        this.$router.push('/collection')
      } else {
        this.$emit('moduleClick', name)
      }
    }
  }
}
</script>

<style scoped>
.profile-user-order {
  background-color: #fff;
  margin-top: 10px;
}
.modules {
  font-size: 14px;
  display: flex;
  align-items: flex-end;
  text-align: center;
}
.item {
  width: 25%;
  padding: 13px 0;
}
.item:nth-child(-n+3) {
  border-right: 1px solid #E0E0E0;
}
.item .img {
  width: 100%;
}
.item .img img {
  width: 36%;
  height: auto;
  margin: 5px 0;
}
</style>