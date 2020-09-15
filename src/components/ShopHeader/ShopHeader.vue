<!--  -->
<template>
  <div class="shop-header">
    <nav
      class="shop-nav"
      :style="{ backgroundImage: 'url(' + info.bgImg + ')' }"
    >
      <a class="back" @click="$router.back()">
        <i class="iconfont icon-houtui"></i>
      </a>
    </nav>
    <div class="shop-content">
      <img
        src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg"
        class="content-image"
      />
      <div class="header-content">
        <h2 class="content-title" @click="shopShow = true">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{ info.name }}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{ info.score }}</span>
          <span class="shop-message-detail">{{ info.sellCount }}</span>
          <span class="shop-message-detail">
            {{ info.description }}
            <span>{{ "约" + info.deliveryTime + "分钟" }}</span>
          </span>
          <span class="shop-message-detail">{{ "距离" + info.distance }}</span>
        </div>
      </div>
    </div>
    <div
      class="shop-header-discounts"
      v-if="info.supports"
      @click="supportShow = true"
    >
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[info.supports[0].type]">
          <span class="content-tag">
            <span class="mini-tag">{{ info.supports[0].name }}</span>
          </span>
          <span class="activity-content ellipsis">{{
            info.supports[0].content
          }}</span>
        </div>
      </div>
      <div class="discounts-right">{{ info.supports.length + "个优惠" }}</div>
    </div>
    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
            <span class="content-tag">
              <span class="mini-tag">品牌</span>
            </span>
            <span class="content-name">{{ info.name }}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{ info.score }}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{ info.sellCount }}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{ info.description }}</h3>
              <p>约{{ info.deliveryTime }}分钟</p>
            </li>
            <li>
              <h3>{{ info.deliveryPrice }}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{ info.distance }}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span>
          </h3>
          <div class="brief-modal-notice">{{ info.bulletin }}</div>
          <div class="mask-footer" @click="shopShow = false">
            <span class="iconfont icon-baseline-close-px"></span>
          </div>
        </div>
        <div class="brief-modal-cover"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="activity-sheet" v-show="supportShow">
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list" v-if="info.supports">
            <li
              class="activity-item"
              :class="supportClasses[support.type]"
              v-for="(support, index) in info.supports"
              :key="index"
            >
              <span class="content-tag">
                <span class="mini-tag">{{ support.name }}</span>
              </span>
              <span class="activity-content">{{ support.content }}</span>
            </li>
          </ul>
          <div class="activity-sheet-close" @click="supportShow = false">
            <span class="iconfont icon-baseline-close-px"></span>
          </div>
        </div>
        <div class="activity-sheet-cover"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      supportClasses: ["activity-green", "activity-red", "activity-orange"],
      shopShow: false,
      supportShow: false,
    };
  },
  computed: {
    ...mapState(["info"]),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.shop-header
  position relative
  width 100%
  background-color #fff
  .shop-nav
    position relative
    background-size cover
    height 40px
    padding 5px 10px
    .back
      position absolute
      top 50%
      left 10px
      transform translateY(-50%)
      color #ffffff
      i
        font-size 20px
  .shop-content
    position relative
    padding 30px 20px 5px 20px
    text-align center
    >img
      position absolute
      top -40px
      left 50%
      transform translateX(-50%)
      width 66px
      height 66px
    .header-content
      text-align center
      .content-title
        display flex
        text-align center
        justify-content center
        line-height 24px
        align-items center
        // align-items center
        .content-tag
          position relative
          width 36px
          height 18px
          text-align center
          background-image linear-gradient(90deg, #fff100, #ffe339)
          border-radius 2px
          margin-right 10px
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            font-weight 600
            color #6a3709
            transform scale(0.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
            // height 36px
            // line-height 36px
        .content-name
          font-weight 700
          font-size 20px
          overflow hidden
          text-overflow ellipsis
        .content-icon
          position relative
          width 20px
          height 16px
          &::after
            position absolute
            top 3px
            left 8px
            content ''
            border-width 6px 0 6px 6px
            border-color transparent transparent transparent rgba(0, 0, 0, 0.67)
            border-style solid
      .shop-message
        display flex
        justify-content center
        align-items center
        height 12px
        margin-top 8px
        font-size 11px
        color #333
        .shop-message-detail
          margin-right 7px
          &:last-child
            margin-right 0
  .shop-header-discounts
    display flex
    align-items center
    justify-content space-between
    // width 100%
    border 1px solid #eee
    border-radius 1px
    padding 5px 7px
    margin 0 30px
    font-size 11px
    color #666
    .discounts-left
      overflow hidden
      .activity
        display flex
        align-items center
        .content-tag
          position relative
          width 25px
          height 13px
          border-radius 1px
          background-color rgb(112, 188, 70)
          margin-right 5px
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 18px
            font-weight 600
            color #fff
            transform scale(0.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
    .discounts-right
      width 50px
      position relative
      padding-right 10px
      text-align right
      &::after
        content ''
        position absolute
        right 0
        top 50%
        transform translateY(-50%)
        border-width 4px 4px 0 4px
        border-color rgba(0, 0, 0, 0.57) transparent transparent transparent
        border-style solid
  .shop-brief-modal
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    display flex
    justify-content center
    align-items center
    z-index 52
    flex-direction column
    color #333
    &.fade-enter-active, &.fade-enter-leave
      transition opacity 0.3s
    &.fade-enter-active, &.fade-enter-leave
      opacity 0
    .brief-modal-cover
      // display none
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color rgba(0, 0, 0, 0.5)
      z-index 1
    .brief-modal-content
      position relative
      width 80%
      padding 25px 20px
      background-color #fff
      border-radius 5px
      z-index 99
      display flex
      flex-direction column
      .content-title
        display flex
        justify-content center
        align-items center
        font-weight 700
        font-size 20px
        line-height 24px
        >span
          font-weight 600
        .content-tag
          position relative
          width 36px
          height 18px
          border-radius 2px
          margin-right 10px
          background-image linear-gradient(90deg, #fff100, #ffe339)
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            font-weight 600
            color #6a3709
            transform scale(0.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
      .brief-modal-msg
        display flex
        margin 20px -10px 0
        >li
          flex 1
          >h3
            text-align center
            font-size 15px
            font-weight 700
            color #333
            margin-bottom 8px
          >p
            text-align center
            font-size 12px
            color #999
      .brief-modal-title
        text-align center
        position relative
        margin 15px auto 15px
        width 85px
        background-image linear-gradient(90deg, #fff, #333 50%, #fff)
        background-size 100% 1px
        background-position 50%
        background-repeat no-repeat
        > span
          font-size 12px
          padding 0 6px
          color #999
          background-color #fff
      .brief-modal-notice
        font-size 13px
        line-height 1.54
        color #333
        overflow-y auto
      .mask-footer
        position absolute
        left 50%
        bottom -60px
        transform translateX(-50%)
        padding 6px
        border 1px solid rgba(255, 255, 255, 0.7)
        border-radius 50%
        >span
          font-size 16px
          color rgba(255, 255, 255, 0.7)
  .activity-sheet
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 99
    &.fade-enter-active, &.fade-enter-leave
      transition opacity 0.3s
    &.fade-enter-active, &.fade-enter-leave
      opacity 0
    .activity-sheet-content
      position absolute
      background-color #f5f5f5
      box-shadow 0 -1px 5px 0 rgba(0, 0, 0, 0.4)
      bottom 0
      left 0
      right 0
      z-index 100
      padding 20px 30px
      box-sizing border-box
      transition transform 0.2s
      will-change transform
      .activity-sheet-title
        text-align center
        font-weight 600
        font-size 20px
        margin-bottom 20px
      .list
        overflow-y auto
        height 160px
        .activity-item
          margin-bottom 12px
          font-size 13px
          display flex
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color rgb(241, 136, 79)
          .content-tag
            position relative
            width 36px
            height 18px
            // text-align center
            border-radius 2px
            margin-right 10px
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              font-weight 600
              color #ffffff
              transform scale(0.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .activity-sheet-close
        position absolute
        top 10px
        right 6px
        width 25px
        height 25px
        >span
          font-size 20px
    .activity-sheet-cover
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.5)
</style>
