<!--  -->
<template>
  <transition name="fade">
    <div class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" />
          <p class="foodpanel-desc">{{food.info}}</p>
          <div class="back" @click="displayFood">
            <i class="iconfont icon-houtui"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
        </div>
      </div>
      <div class="food-cover" @click="displayFood"></div>
    </div>
  </transition>
</template>

<script>
import CartControl from "../CartControl/CartControl";
export default {
  data() {
    return {};
  },
  props: {
    food: Object,
  },
  components: {
    CartControl,
  },
  methods: {
    displayFood() {
      this.$emit("displayFood");
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.food
  position fixed
  top 0
  left 0
  z-index 101
  width 100%
  height 100%
  &.fade-enter-active, &.fade-leave-active
    transition all 0.3s
  &.fade-enter, &.fade-leave-to
    opacity 0
  .food-content
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 80%
    z-index 66
    background-color #fff
    border-radius 5px
    .image-header
      position relative
      height 0
      width 100%
      padding-top 100%
      >img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .foodpanel-desc
        position absolute
        bottom 10px
        left 10px
        font-size 10px
        color #ddd
      .back
        position absolute
        top 10px
        left 10px
        .icon-houtui
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
        font-weight 700
        margin-bottom 8px
      .detail
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
        margin-bottom 18px
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          color rgb(240, 20, 20)
          font-size 14px
          margin-right 8px
        .old
          text-decoration line-through
          color rgb(147, 153, 159)
          font-size 10px
      .cartcontrol-wrapper
        position absolute
        bottom 12px
        right 12px
  .food-cover
    position absolute
    top 0
    left 0
    z-index 55
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.5)
</style>
