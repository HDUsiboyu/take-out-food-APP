<!--  -->
<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-tianchongxing-" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <transition name="swiper">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in shopCart" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
import CartControl from "../CartControl/CartControl";
import { mapState, mapGetters } from "vuex";
import Bscroll from "better-scroll";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      isShow: true,
      scroll: false,
    };
  },
  components: {
    CartControl,
  },
  computed: {
    ...mapState(["info", "shopCart"]),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      return totalPrice >= minPrice ? "enough" : "not-enough";
    },
    payText() {
      const { totalPrice } = this;
      const { minPrice } = this.info;
      if (totalPrice == 0) return "￥" + minPrice + "元起送";
      else if (totalPrice < minPrice)
        return "还差￥" + (minPrice - totalPrice) + "元起送";
      else return "结算";
    },
    listShow() {
      if (this.totalCount == 0) {
        this.isShow = false;
      }
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll)
            this.scroll = new Bscroll(".list-content", {
              click: true,
            });
          else this.scroll.refresh(); //重新更新页面高度
        });
      }
      return this.isShow;
    },
  },
  methods: {
    toggleShow() {
      if (this.totalCount) this.isShow = !this.isShow;
    },
    clearCart() {
      MessageBox.confirm("确定清空购物车吗？").then((action) => {
        this.$store.dispatch("clearCart");
        Toast("清空成功");
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    width 100%
    height 100%
    font-size 0
    display flex
    background-color #141d27
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        margin 0 12px
        padding 6px
        background-color #141d27
        border-radius 50%
        position relative
        top -10px
        width 56px
        height 56px
        box-sizing border-box
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background-color #2b343c
          &.highlight
            background-color green
          .icon-tianchongxing-
            font-size 24px
            line-height 44px
            color #80858a
            &.highlight
              color #ffffff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          border-radius 16px
          background-color rgb(240, 20, 20)
          text-align center
          font-size 9px
          color #ffffff
          line-height 16px
          font-weight 700
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        font-size 16px
        box-sizing border-box
        font-weight 700
        color #ffffff
        &.highlight
          color #ffffff
      .desc
        display inline-block
        vertical-align bottom
        margin-bottom 15px
        margin-left -45px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        font-size 12px
        color #ffffff
        line-height 48px
        font-weight 700
        text-align center
        &.not-enough
          background-color #2b333b
        &.enough
          background-color #00b43c
  .shopcart-list
    width 100%
    position absolute
    bottom 48px
    left 0
    z-index -1
    &.swiper-enter-active, &.swiper-leave-active
      transition all 0.3s
    &.swiper-enter, &.swiper-leave-to
      transform translateY(100%)
    .list-header
      display flex
      justify-content space-between
      height 40px
      padding 0 18px
      line-height 40px
      background-color #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      background-color #fff
      max-height 217px
      overflow hidden
      padding 0 18px
      .food
        position relative
        height 48px
        line-height 48px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          bottom 0
          right 90px
          font-size 14px
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          top 6px
          right 0
.list-mask
  position fixed
  top 0
  right 0
  width 100%
  height 100%
  z-index 40
  background-color rgba(7, 17, 27, 0.6)
  backdrop-filter blur(10px)
  opacity 1
    &.fade-enter-active, &.fade-leave-active
      transition all 0.3s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background-color rgba(7, 17, 27, 0)
</style>
