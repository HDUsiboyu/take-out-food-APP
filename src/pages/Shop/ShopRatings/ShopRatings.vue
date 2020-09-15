<!--  -->
<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <Star :score="4.1" :size="36"></Star>
            <span class="title">服务态度</span>
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <Star :score="4.3" :size="36"></Star>
            <span class="title">商品评分</span>
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span
            class="block positive"
            :class="{ active: selectType == 2 }"
            @click="selectType = 2"
          >
            全部
            <span class="count">{{ ratings.length }}</span>
          </span>
          <span
            class="block positive"
            :class="{ active: selectType == 0 }"
            @click="selectType = 0"
          >
            满意
            <span class="count">{{ positiveCount }}</span>
          </span>
          <span
            class="block negative"
            :class="{ active: selectType == 1 }"
            @click="selectType = 1"
          >
            不满意
            <span class="count">{{ ratings.length - positiveCount }}</span>
          </span>
        </div>
        <div
          class="switch"
          :class="{ on: onlyShowText }"
          @click="onlyShowText = !onlyShowText"
        >
          <span class="iconfont icon-zhengque"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li
            class="rating-item"
            v-for="(rating, index) in filterRatings"
            :key="index"
          >
            <div class="avatar">
              <img :src="rating.avatar" style="width: 28px; height: 28px;" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <Star :score="5" :size="24"></Star>
                <span class="delivery">{{ rating.deliveryTime }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span
                  class="iconfont"
                  :class="rating.rateType == 0 ? 'icon-zan' : 'icon-diancai'"
                ></span>
                <span
                  class="item"
                  v-for="(item, index) in rating.recommend"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
              <div class="time">{{ rating.rateTime | dataString }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Star from "../../../components/star/star";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      onlyShowText: true, //是否只显示有文本的
      selectType: 2, //选择评价类型
    };
  },
  components: {
    Star,
  },
  computed: {
    ...mapState(["info", "ratings"]),
    ...mapGetters(["positiveCount"]),

    filterRatings() {
      const { ratings, onlyShowText, selectType } = this;
      return ratings.filter((rating) => {
        if (selectType == 2) {
          if (onlyShowText) {
            if (rating.text) return true;
          } else {
            return true;
          }
        } else if (selectType == 1) {
          if (onlyShowText) {
            if (rating.text && rating.rateType) return true;
          } else {
            if (rating.rateType) return true;
          }
        } else {
          if (onlyShowText) {
            if (rating.text && !rating.rateType) return true;
          } else {
            if (!rating.rateType) return true;
          }
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getShopRatings");
  },
  watch: {
    ratings(value) {
      this.$nextTick(() => {
        new Bscroll(".ratings");
      });
    },
  },
  methods: {},
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.ratings
  position absolute
  top 195px
  bottom 0
  width 100%
  overflow hidden
  background-color #f3f5f7
  .overview
    display flex
    padding 18px 0
    background-color #fff
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    margin-bottom 16px
    .overview-left
      flex 0 0 137px
      text-align center
      border-right 1px solid rgba(7, 17, 27, 0.1)
      padding 6px 0
      // @media only screen and (max-width 320px)
      // flex 0 0 120px
      // width 120px
      .score
        font-size 24px
        color rgb(255, 153, 0)
        line-height 28px
        margin-bottom 6px
      .title
        font-size 12px
        line-height 12px
        margin-bottom 8px
        color rgb(7, 17, 27)
      .rank
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      .score-wrapper
        font-size 0
        margin-bottom 8px
        .star
          margin 0 12px
          vertical-align top
        .title
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
          vertical-align top
        .score
          font-size 12px
          color rgb(255, 153, 0)
          vertical-align top
          line-height 18px
    .delivery-wrapper
      .title
        font-size 12px
        line-height 18px
        color rgb(7, 17, 27)
      .delivery
        font-size 12px
        height 18px
        color rgb(147, 153, 159)
  .ratingselect
    border-top 1px solid rgba(7, 17, 27, 0.1)
    padding 18px 18px 12px
    background-color #fff
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .rating-type
      font-size 0
      margin-bottom 18px
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border 1px solid rgba(7, 17, 27, 0.1)
        border-radius 1px
        line-height 16px
        font-size 12px
        background-color rgba(77, 85, 93, 0.2)
        color rgb(77, 85, 93)
        &.active
          background-color green
          color #ffffff
        .count
          margin-left 2px
          font-size 8px
    .switch
      padding-top 12px
      line-height 24px
      font-size 0
      .iconfont
        display inline-block
        font-size 24px
        margin-right 4px
        vertical-align top
        color rgb(147, 153, 159)
      .text
        display inline-block
        font-size 12px
        vertical-align top
        color rgb(147, 153, 159)
      &.on
        .iconfont
          color green
  .rating-wrapper
    padding 0 18px
    background-color #fff
    .rating-item
      display flex
      padding 18px 0
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .avatar
        flex 0 0 28px
        margin-right 12px
        >img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          font-size 10px
          line-height 12px
          color rgb(7, 17, 27)
          margin-bottom 4px
          vertical-align top
        .star-wrapper
          clearFix()
          margin-bottom 6px
          font-size 0
          .star
            margin-right 6px
            vertical-align top
          .delivery
            font-size 10px
            line-height 12px
            vertical-align top
            color rgb(147, 153, 159)
        .text
          font-size 12px
          line-height 18px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .recommend
          line-height 16px
          font-size 0
          .iconfont, .item
            display inline-block
            font-size 9px
            margin 0 8px 4px 0
          .icon-zan
            color $yellow
          .icon-tubiao_diancai
            color rgb(147, 153, 159)
          .item
            border 1px solid rgba(7, 17, 27, 0.1)
            color rgb(147, 153, 159)
            border-radius 1px
            padding 0 6px
        .time
          position absolute
          top 0
          right 0
          font-size 10px
          line-height 12px
          color rgb(147, 153, 159)
</style>
