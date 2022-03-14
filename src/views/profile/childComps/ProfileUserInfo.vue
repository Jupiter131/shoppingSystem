<template>
  <div class="profile-user-info">
    <slot name="user-icon">
      <div class="avatar">
        <img src="~@/assets/img/login/avatar.jpg" alt="">
      </div>
    </slot>
    <div class="login-info">
      <div class="name">{{$store.getters.userUsername}}</div>
      <div class="email">
        <img src="~@/assets/img/login/email.svg" alt="">
        <div>{{$store.getters.userEmail}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileUserInfo"
}
</script>

<style scoped>
.profile-user-info {
  background-color: var(--color-tint);
  padding: 15px;
  display: flex;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}

.login-info {
  color: #fff;
  margin-left: 12px;
}
.login-info .name {
  margin: 10px 0 6px;
}
.login-info .email {
  display: flex;
}
.login-info .email img {
  height: 16px;
  widows: 16px;
  margin-right: 5px;
}
</style>