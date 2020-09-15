<!--  -->
<template>
  <section class="search">
    <HeaderTop title="搜索"></HeaderTop>
    <form action="#" class="search_form" @submit.prevent="search">
      <input
        type="search"
        name="search"
        class="search_input"
        placeholder="请输入商家或美食名称"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>
    <section class="list" v-if="searchShops.length">
      <ul class="list_container">
        <router-link
          :to="{path:'/shop',query:{id:searchShop.id}}"
          tag="li"
          class="list_li"
          v-for="(searchShop, index) in searchShops"
          :key="index"
        >
          <section class="item_left">
            <img
              :src="'http://cangdu.org:8001/img/' + searchShop.image_path"
              class="restaurant_img"
            />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{searchShop.name}}</span>
              </p>
              <p>月售{{searchShop.recent_order_num}}单</p>
              <p>{{searchShop.float_minimum_order_amount}}元起送/距离{{searchShop.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-if="isSearch&&!searchShops.length">很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "", //关键字
      isSearch: false, //是否搜索
    };
  },
  components: {
    HeaderTop,
  },
  methods: {
    search() {
      const { keyword } = this;
      if (keyword) this.isSearch = true;
      // else this.isSearch = false;
      if (keyword) this.$store.dispatch("getSearchShops", { keyword });
    },
  },
  computed: {
    ...mapState(["searchShops"]),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.search
  position relative
  width 100%
  height 100%
  overflow auto
  background-color #fff
  .search_form
    clearFix()
    // width 100%
    margin-top 45px
    padding 12px 8px 12px 8px
    background-color #fff
    input
      height 35px
      border-radius 2px
      font-weight 700
      outline none
      &.search_input
        float left
        padding 5px 0 5px 5px
        border 4px solid #f2f2f2
        background-color #f2f2f2
        width 79%
        color #333
      &.search_submit
        float right
        width 18%
        padding 4px 8px 4px 8px
        font-size 16px
        color #ffffff
        background-color #02a774
  .list
    position absolute
    top 100px
    bottom 70px
    // height 560px
    overflow auto
    background-color #fff
    .list_container
      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc
        overflow hidden
        .item_left
          margin-right 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    // position absolute
    // top 57px
    // left 0
    // right 0
    // bottom 0
    margin 0 auto
    color #333333
    background-color #fff
    text-align center
    margin-top 0.125rem
</style>
