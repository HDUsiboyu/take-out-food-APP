<!--  -->
<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import { reqCategorys } from "./api";
export default {
  mounted() {
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getUserInfo");
  },
  components: { FooterGuide },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
