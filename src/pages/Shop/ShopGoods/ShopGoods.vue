<!--  -->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            :class="{ current: index == currentIndex }"
            v-for="(good, index) in goods"
            :key="index"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img :src="good.icon" class="icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img :src="food.image" style="width: 57px; height: 57px;" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc" v-if="food.description">
                    {{ food.description }}
                  </p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl
                      :food="food"
                      v-on:updateFoodCount="updateFoodCount"
                    ></CartControl>
                  </div>
                </div>
                <div class="clear"></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" v-if="isShowFood" @displayFood="displayFood"></Food>
  </div>
</template>

<script>
import CartControl from "../../../components/CartControl/CartControl";
import ShopCart from "../../../components/ShopCart/ShopCart";
import Food from "../../../components/Food/Food";
import { mapState } from "vuex";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      scrollY: 0, //右侧滑动的Y坐标
      tops: [], //所有右侧分类li的top组成的数组（列表第一次显示后就不再变化）
      food: {}, //需要显示的food
      isShowFood: false, //是否显示food
    };
  },
  components: {
    CartControl,
    Food,
    ShopCart,
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        this._initScroll();
        this._initTops();
      });
    });
  },
  computed: {
    ...mapState(["goods"]),

    //计算得到当前分类的下标
    currentIndex() {
      //得到条件数据
      const { scrollY, tops } = this;
      console.log(scrollY, tops);
      let current = 0;
      //根据条件计算产生一个结果
      for (var i = 0; i < tops.length; i++) {
        if (scrollY >= tops[i] && scrollY < tops[i + 1]) current = i;
      }
      //返回结果
      return current;
    },
  },
  methods: {
    _initScroll() {
      new Bscroll(".menu-wrapper", {
        click: true,
      });
      this.foodsScroll = new Bscroll(".foods-wrapper", {
        probeType: 2,
        click: true,
      });
      //给右侧列表绑定scroll监听
      this.foodsScroll.on("scroll", ({ x, y }) => {
        console.log(x, y);
        this.scrollY = Math.abs(y);
      });
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        console.log(x, y);
        this.scrollY = Math.abs(y);
      });
    },
    _initTops() {
      const tops = [];
      let top = 0;
      tops.push(top);
      //找到所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      console.log(lis);
      // Array.prototype.slice.call(lis);
      // for (var li in lis) {
      //   console.log(li);
      //   top += li.offsetHeight;
      //   console.log(top);
      //   tops.push(top);
      // }
      for (var i = 0; i < lis.length; i++) {
        // console.log(lis[i]);
        top += lis[i].offsetHeight;
        // console.log(top);
        tops.push(top);
      }
      this.tops = tops;
      console.log(tops);
    },
    clickMenuItem(index) {
      //使用右侧列表滑动到对应的位置
      this.scrollY = this.tops[index];
      this.foodsScroll.scrollTo(0, -this.tops[index], 300);
    },
    updateFoodCount({ isAdd, food }) {
      if (isAdd) {
        if (!food.count) {
          // food.count = 1;
          this.$set(food, "count", 1);
          console.log(food.count);
        } else {
          food.count++;
        }
      } else {
        if (food.count) food.count--;
      }
      console.log(food.count);
    },
    showFood(food) {
      //设置food
      this.food = food;
      //显示food组件
      this.isShowFood = true;
    },
    displayFood() {
      this.isShowFood = false;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  position absolute
  top 195px
  bottom 46px
  width 100%
  display flex
  background-color #fff
  overflow hidden
  margin-top 1px
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background-color #f3f5f7
    >ul
      // height 500px
      // overflow auto
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        &.current
          position relative
          background-color #ffffff
          z-index 10
          margin-top -1px
          color $green
        .text
          display table-cell
          // line-height 54px
          // height 54px
          font-weight 700
          font-size 12px
          vertical-align middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align middle
            width 12px
            height 12px
            margin-right 2px
            line-height 56px
  .foods-wrapper
    flex 1
    // height 500px
    // overflow auto
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      color rgb(147, 153, 159)
      font-size 12px
      background-color #f3f5f7
    >ul
      .food-item
        .clear
          clear both
        position relative
        padding 18px 0
        margin 0 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .icon
          float left
          margin-right 10px
        .content
          float left
          width 226.6px
          .name
            margin 2px 0 8px 0
            height 14px
            font-size 14px
            color rgb(7, 17, 27)
            font-weight 700
          .desc, .extra
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
            margin-top 8px
          .extra
            line-height 10px
            .count
              margin-right 12px
          .price
            .now
              font-weight 700
              line-height 24px
              color rgb(240, 20, 20)
              font-size 14px
              margin-right 8px
            .old
              font-size 10px
              text-decoration line-through
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
