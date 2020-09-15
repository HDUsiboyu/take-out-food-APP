<!--  -->
<template>
  <section class="profile">
    <HeaderTop title="我的"></HeaderTop>
    <section class="profile-number">
      <router-link :to="userInfo._id?'/userinfo':'/login'" class="profile-link">
        <div class="profile_image">
          <i class="iconfont icon-icon-test1"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name||'登录/注册'}}</p>
          <p class="user-icon-top">
            <span class="user-icon">
              <i class="iconfont icon-shouji"></i>
            </span>
            <span class="icon-mobile-number">{{userInfo.phone||'暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-iconfontjiantou3"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <li>
          <a href="javascript;:" class="info_data_link">
            <span class="info_data_top">
              <span>0.00</span>元
            </span>
            <span class="info_data_bottom">我的余额</span>
          </a>
        </li>
        <li>
          <a href="javascript;:" class="info_data_link">
            <span class="info_data_top">
              <span>0</span>个
            </span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
        </li>
        <li>
          <a href="javascript;:" class="info_data_link">
            <span class="info_data_top">
              <span>0</span>分
            </span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <ul>
        <li>
          <a href="javascript:;" class="my_order">
            <span>
              <i class="iconfont icon-filedicon_orderfro"></i>
            </span>
            <div class="my_order_div">
              <span>我的订单</span>
              <span class="my_order_icon">
                <i class="iconfont icon-iconfontjiantou3"></i>
              </span>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;" class="my_order">
            <span>
              <i class="iconfont icon-jifen"></i>
            </span>
            <div class="my_order_div">
              <span>积分商城</span>
              <span class="my_order_icon">
                <i class="iconfont icon-iconfontjiantou3"></i>
              </span>
            </div>
          </a>
        </li>
        <li>
          <a href="javascript:;" class="my_order">
            <span>
              <i class="iconfont icon-vip"></i>
            </span>
            <div class="my_order_div">
              <span>硅谷外卖会员卡</span>
              <span class="my_order_icon">
                <i class="iconfont icon-iconfontjiantou3"></i>
              </span>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <a href="javascript:;" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-iconfontjiantou3"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <mt-button
        class="logout"
        type="danger"
        style="width:100%"
        v-if="userInfo._id"
        @click="logout"
      >退出登陆</mt-button>
    </section>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
import { MessageBox, Toast } from "mint-ui";
export default {
  components: {
    HeaderTop,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    logout() {
      MessageBox.confirm("确认退出吗?").then((action) => {
        this.$store.dispatch("logout");
        Toast("登出完成");
      });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.profile
  overflow hidden
  width 100%
  height 100%
  background-color #fff
  .profile-number
    margin-top 45.2px
    background-color #02a774
    .profile-link
      clearFix()
      position relative
      display block
      color #ffffff
      padding 20px 10px 20px 0
      .profile_image
        float left
        margin-left 10px
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        .icon-icon-test1
          font-size 62px
          color #ffffff
          background-color #e4e4e4
      .user-info
        float left
        padding-left 15px
        margin-top 8px
        .user-info-top
          font-weight 700
          font-size 18px
          padding-bottom 8px
        .user-icon-top
          padding-bottom 8px
          .user-icon
            display inline-block
            margin-left -4px
            margin-right -5px
            width 20px
            height 20px
            .icon-shouji
              font-size 20px
              vertical-align top
          .icon-mobile-number
            font-size 16px
      .arrow
        position absolute
        right 15px
        top 40%
        width 12px
        height 12px
        .icon-iconfontjiantou3
          font-size 5px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      li
        .info_data_link
          float left
          width 33%
          text-align center
          border-right 1px solid #f1f1f1
          .info_data_top
            display block
            padding 15px 5px 10px
            font-size 14px
            span
              font-size 30px
              color #f90
              font-weight 700
          .info_data_bottom
            display inline-block
            font-size 14px
            color #666
            font-weight 400
            padding-bottom 10px
      li:nth-child(2)
        .info_data_link
          .info_data_top
            span
              color #ff5f3e
      li:nth-child(3)
        .info_data_link
          .info_data_top
            span
              color #6ac20b
  .profile_my_order
    margin-top 15px
    width 100%
    border 1px solid #f1f1f1
    background-color #fff
    >.my_order
      display flex
      align-items center
      padding-left 15px
      // padding-right 15px
      >span
        line-height 20px
        width 40px
        height 20px
        .iconfont
          margin-left -10px
          font-size 30px
          color #02a774
      .my_order_div
        // background-color pink
        width 100%
        padding 18px 10px 18px 0
        font-size 16px
        color #333333
        display flex
        justify-content space-between
        .my_order_icon
          width 10px
          height 10px
          color #bbbbbb
          font-size 10px
    ul
      width 100%
      li
        bottom-border-1px(#e4e4e4)
        width 100%
        .my_order
          display flex
          align-items center
          padding-left 15px
          >span
            line-height 20px
            width 40px
            height 20px
            .iconfont
              margin-left -10px
              font-size 30px
            .icon-filedicon_orderfro
              color #02a774
            .icon-jifen
              margin-left -7px
              font-size 20px
              color #ff5f3e
            .icon-vip
              font-size 20px
              margin-left -5px
              color #f90
          .my_order_div
            // background-color pink
            width 100%
            padding 18px 10px 18px 0
            font-size 16px
            color #333333
            display flex
            justify-content space-between
            .my_order_icon
              width 10px
              height 10px
              color #bbbbbb
              font-size 10px
</style>
