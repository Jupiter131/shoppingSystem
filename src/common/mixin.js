import { debounce } from "./utils";

export const itemImageListenerMixin = {
  data() {
    return {
      itemImageListener: null,
    };
  },
  mounted() {
    const refreshFunc = this.$refs.scroll.refresh; //函数
    const refresh = debounce(refreshFunc, 500); //500毫秒
    this.itemImageListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
};


import BackTop from "@/components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    //better-scroll的方法，点击返回顶部
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
      //this.$refs.scroll.scrollTo(0, 0);
    },
  }
};


import { POP, NEW, SELL } from "./const";

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}