<!--  -->
<template>
  <div class="msite">
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        :to="userInfo._id ? '/userinfo' : '/login'"
        class="header_login"
        slot="right"
      >
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-icon-test1" style="font-size: 24px;"></i>
        </span>
      </router-link>
    </HeaderTop>
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorysArr.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:;"
              class="link_to_food"
              v-for="(category, index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="imgBaseUrl + category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-option"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList";
import Swiper from "swiper";
import { mapState } from "vuex";
// import VueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/swiper-bundle.css";
import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      imgBaseUrl: "https://fuss10.elemecdn.com",
    };
  },
  components: {
    HeaderTop,
    ShopList,
  },
  mounted() {
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getShops");
  },
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),

    /*
    根据categorys一维数组生成一个2维数组 
    小数组中的元素个数最大是8
    */
    categorysArr() {
      const { categorys } = this;
      const arr = [];
      let minArr = [];
      categorys.forEach((c, index) => {
        minArr.push(c);
        if (minArr.length == 8) {
          arr.push(minArr);
          // console.log(minArr);
          minArr = [];
        }
        if (index == categorys.length - 1 && minArr.length != 0) {
          arr.push(minArr);
        }
      });
      // console.log(arr);
      return arr;
    },
  },
  watch: {
    categorys(value) {
      //界面更新就立即创建Swiper对象
      this.$nextTick(() => {
        //一旦完成界面更新，立即调用（此条语句要写在数据更新之后）
        new Swiper(".swiper-container", {
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            // clickable: true
          },
        });
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite
  width 100%
  // overflow hidden
  .msite_nav
    // overflow hidden
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background-color #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        height 100%
        width 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            margin-top 10px
            .food_container
              display block
              text-align center
              width 100%
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background-color #fff
    .shop_header
      width 100%
      padding 10px
      .icon-option
        padding-right 10px
        font-size 12px
        color #999
      .shop_header_title
        font-size 14px
        line-height 20px
        color #999
</style>