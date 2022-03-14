<template>
  <div class="profile">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
      <div slot="right" class="set" @click="setClick">
        <img src="~@/assets/img/profile/set.png" alt="">
      </div>
    </nav-bar>

    <!-- 用户信息 -->
    <profile-user-info />

    <!-- 我的订单 -->
    <profile-user-order name1="我的收藏" name2="待收货" name3="退款/售后" name4="全部订单" @moduleClick="moduleClick">
      <div slot="title" class="title">我的订单</div>
      <img slot="module1" src="~@/assets/img/profile/pro1.png" alt="">
      <img slot="module2" src="~@/assets/img/profile/pro2.png" alt="">
      <img slot="module3" src="~@/assets/img/profile/pro3.png" alt="">
      <img slot="module4" src="~@/assets/img/profile/pro4.png" alt="">
    </profile-user-order>
    
    <!-- 我的资产 -->
    <profile-user-order name1="优惠券" name2="超豆" name3="红包" name4="我的资产" @moduleClick="moduleClick">
      <div slot="module1" class="count">0</div>
      <div slot="module2" class="count">0</div>
      <div slot="module3" class="count">0</div>
      <img slot="module4" src="~@/assets/img/profile/pro5.png" alt="">
    </profile-user-order>

    <!-- 工具与服务 -->
    <profile-user-order name1="客户服务" name2="我的预约" name3="闲置换钱" name4="高价回收" @moduleClick="moduleClick">
      <div slot="title" class="title">工具与服务</div>
      <img slot="module1" src="~@/assets/img/profile/pro6.png" alt="">
      <img slot="module2" src="~@/assets/img/profile/pro7.png" alt="">
      <img slot="module3" src="~@/assets/img/profile/pro8.png" alt="">
      <img slot="module4" src="~@/assets/img/profile/pro9.png" alt="">
    </profile-user-order>

    <!-- 底部扩展功能 -->
    <profile-extend class="bottom" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import ProfileUserInfo from "./childComps/ProfileUserInfo"
import ProfileUserOrder from "./childComps/ProfileUserOrder"
import ProfileExtend from "./childComps/ProfileExtend"

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileUserInfo,
    ProfileUserOrder,
    ProfileExtend
  },
  data() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" },
      ],
    };
  },
  methods: {
    setClick() {
      this.$toast.show('暂时无法设置')
    },
    moduleClick(name) {
      this.$toast.show(name + '功能暂未开发')
    }
  }
}
</script>

<style scoped>
.profile {
  background-color: #f2f2f2;
  height: calc(100vh - 49px);
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.set img {
  margin-top: 10px;
  height: 20px;
  width: 20px;
}

.title {
  font-size: 15px;
  padding: 12px 0 8px 18px;
}
.count {
  color: #EA0000;
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
}

.bottom {
  margin-top: 10px;
}
</style>