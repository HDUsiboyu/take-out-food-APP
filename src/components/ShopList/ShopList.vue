<!--  -->
<template>
  <div class="shop_container">
    <ul class="shop_list" v-if="shops.length">
      <li
        class="shop_li border-1px"
        v-for="(shop, index) in shops"
        :key="index"
        @click="$router.push('/shop')"
      >
        <a href="javascript:;">
          <div class="shop_left">
            <img class="shop_img" :src="ImgBaseUrl + shop.image_path" />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
              <ul class="shop_detail_ul">
                <li
                  class="supports"
                  v-for="(support, index) in shop.supports"
                  :key="index"
                >
                  {{ support.icon_name }}
                </li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <Star :score="shop.rating" :size="24"></Star>
                <div class="rating_section">{{ shop.rating }}</div>
                <div class="order_section">
                  月售{{ shop.recent_order_num }}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_left">{{
                  shop.delivery_mode.text
                }}</span>
                <span class="delivery_style delivery_right">准时达</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{ shop.float_minimum_order_amount }}起送</span>
                <span class="segmentation">/</span>
                <span>{{ shop.piecewise_agent_fee.tips }}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(i, index) in 6" :key="index">
        <img src="./images/shop_back.svg" alt="back" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Star from "../star/star";
export default {
  data() {
    return {
      ImgBaseUrl: "http://cangdu.org:8001/img/",
    };
  },
  computed: {
    ...mapState(["shops"]),
  },
  components: {
    Star,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.shop_container
  .shop_list
    padding 10px 10px 0
    .shop_li
      bottom-border-1px(#f1f1f1)
      margin-top 5px
      padding-bottom 20px
      >a
        clearFix()
        box-sizing border-box
        .shop_left
          float left
          box-sizing border-box
          width 23%
          height 90px
          .shop_img
            width 100%
            height 100%
        .shop_right
          float left
          width 75%
          .shop_detail_header
            clearFix()
            width 100%
            padding 5px 0 10px 10px
            .shop_title
              float left
              width 150px
              line-height 16px
              font-size 16px
              font-weight 700
              color black
              &::before
                display inline-block
                content '品牌'
                font-size 14px
                background-color #ffd930
                color black
                padding 3px
                margin-right 5px
                border-radius 3px
            .shop_detail_ul
              float right
              .supports
                float left
                margin-right 3px
                border 1px solid #f1f1f1
                background-color #F5F5F5
                &:nth-child(3)
                  margin-right 0
          .shop_rating_order
            clearFix()
            width 100%
            font-size 12px
            padding 5px 0 0px 10px
            margin 0 0 6px 0
            .shop_rating_order_left
              float left
              .rating_section
                float left
                color #ff6000
              .order_section
                float left
                color #666
                margin-left 10px
            .shop_rating_order_right
              float right
              .delivery_style
                transform-origin 35px 0
                transform scale(0.7)
                display inline-block
                font-size 12px
                padding 1px
                border-radius 2px
              .delivery_left
                color #fff
                background-color #02a774
                border 1px solid #02a774
              .delivery_right
                color #02a774
                border 1px solid #02a774
                background-color #fff
          .shop_distance
            font-size 12px
            padding 10px 0 10px 10px
</style>
