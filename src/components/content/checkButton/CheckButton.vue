<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~@/assets/img/cart/tick.svg" alt="" class="tupian"/>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
/* .icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
} */
</style>