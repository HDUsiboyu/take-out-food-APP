<!--  -->
<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader";
export default {
  data() {
    return {};
  },
  components: {
    ShopHeader,
  },
  mounted() {
    this.$store.dispatch("getShopInfo");
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.tab
  width 100%
  height 40px
  bottom-border-1px(rgba(7, 17, 27, 0.1))
  background-color #fff
  .tab-item
    float left
    width 33.33%
    line-height 40px
    height 40px
    text-align center
    a
      display inline-block
      &.router-link-active
        position relative
        color #02a774
        &::after
          content ''
          position absolute
          bottom 1px
          left 0
          height 2px
          width 35px
          background-color #02a774
</style>
