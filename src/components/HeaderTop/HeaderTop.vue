<!--  -->
<template>
  <header class="header">
    <slot name="left"></slot>
    <a href="javascript:;" class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </a>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
  position fixed
  left 0
  top 0
  z-index 100
  background-color #02a774
  width 100%
  height 45px
  .header_search
    position absolute
    left 15px
    top 50%
    transform translateY(-50%)
    // display inline-block
    width 10%
    height 50%
    .icon-sousuo
      font-size 25px
      color #fff
  .header_title
    // display block
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 50%
    text-align center
    color #ffffff
    .header_title_text
      font-size 20px
      color #ffffff
      display block
  .header_login
    position absolute
    top 50%
    right 15px
    transform translateY(-50%)
    .header_login_text
      font-size 14px
      color #ffffff
</style>
