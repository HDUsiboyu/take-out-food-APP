<!--  -->
<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <span class="delivery-icon">{{info.description}}</span>
          <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
        </div>
        <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <ul>
            <li
              class="activity-item"
              v-for="(support, index) in info.supports"
              :key="index"
              :class="supportClasses[support.type]"
            >
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
              <img :src="pic" style="width:120px;height:90px" />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span>
            <span>{{info.category}}</span>
          </li>
          <li>
            <span class="bold">商家电话</span>
            <span>{{info.phone}}</span>
          </li>
          <li>
            <span class="bold">地址</span>
            <span>{{info.address}}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <span>{{info.workTime}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      supportClasses: ["activity-green", "activity-red", "activity-orange"],
    };
  },
  computed: {
    ...mapState(["info"]),
  },
  mounted() {
    new Bscroll(".shop-info");
    new Bscroll(".pic-wrapper", {
      scrollX: true,
    });
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.shop-info
  position absolute
  top 195px
  bottom 0
  left 0
  width 100%
  background-color #fff
  overflow hidden
  .section
    // width 100%
    padding 16px 14px 14px
    .section-title
      font-weight 700
      font-size 16px
      line-height 16px
      color #000000
    .delivery
      margin-top 16px
      font-size 13px
      line-height 18px
      >span
        font-size 13px
        color #666666
      .delivery-icon
        display inline-block
        padding 1px 0
        text-align center
        width 55px
        background-color #0097ff
        font-size 11px
        border-radius 4px
        color #ffffff
        margin-right 10px
    .delivery-money
      margin-top 5px
      font-size 13px
      color #666666
      line-height 18px
    .activity
      width 100%
      margin-top 16px
      ul
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background rgb(241, 136, 79)
          .content-tag
            position relative
            display inline-block
            width 36px
            height 18px
            border-radius 2px
            color #fff
            margin-right 10px
            .mini-tag
              position absolute
              top 0
              left 0
              right -100%
              bottom -100%
              transform scale(0.5)
              transform-origin 0 0
              font-size 24px
              display flex
              justify-content center
              align-items center
          .activity-content
            color #666666
    .pic-wrapper
      position relative
      width 100%
      height 90px
      overflow hidden
      white-space nowrap
      margin-top 16px
      .pic-list
        display inline-block
        font-size 0
        .pic-item
          display inline-block
          margin-right 6px
          &:last-child
            margin 0
    .detail
      margin-bottom -16px
      >li
        display flex
        justify-content space-between
        align-items center
        // width 100%
        line-height 16px
        padding 16px 12px 16px 0
        margin-right -10px
        bottom-border-1px(#ddd)
        font-size 13px
        color #666666
        .bold
          color #333333
          font-weight 700
        &:last-child
          border-none()
  .split
    width 100%
    height 16px
    background-color #f3f5f7
    border-top 1px solid rgba(7, 17, 27, 0.1)
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
</style>
