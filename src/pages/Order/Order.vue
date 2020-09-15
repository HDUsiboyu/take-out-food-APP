<!--  -->
<template>
  <section class="order">
    <HeaderTop title="订单列表"></HeaderTop>
    <section class="order_no_login">
      <img src="./images/person.png" alt />
      <h3>登陆后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
export default {
  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order
  position absolute
  width 100%
  height 100%
  background-color #fff
  .order_no_login
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    text-align center
    >h3
      padding 10px 0
      font-size 17px
      text-align center
      color #6a6a6a
    >button
      // width 200px
      padding 10px 20px 10px 20px
      background-color #02a774
      border 0
      border-radius 5px
      font-weight 700
      font-size 14px
      color #ffffff
      text-align center
</style>
