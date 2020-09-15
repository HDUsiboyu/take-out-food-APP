<!--  -->
<template>
  <footer class="footer_guide">
    <a
      href="javascript:;"
      class="guide_item"
      :class="{'on': '/msite'===$route.path}"
      @click="goTo('/msite')"
    >
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{'on': '/search'===$route.path}"
      @click="goTo('/search')"
    >
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{'on': '/order'===$route.path}"
      @click="goTo('/order')"
    >
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a
      href="javascript:;"
      class="guide_item"
      :class="{'on': '/profile'===$route.path}"
      @click="goTo('/profile')"
    >
      <span class="item_icon">
        <i class="iconfont icon-icon-test1"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 70px
  display flex
.guide_item
  display flex
  flex 1
  text-align center
  flex-direction column
  justify-content center
  align-items center
  margin 5px
  color #999999
  &.on
    color #02a774
    spanfont-size 12px
    margin-top 2px
    margin-bottom 2px
  .item_icon
    .iconfont
      display block
      font-size 26px
      margin-bottom 3px
</style>
