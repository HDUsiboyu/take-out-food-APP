<!--  -->
<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-jianhao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jiahao1" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    food: Object,
  },
  methods: {
    // updateFoodCount(isAdd) {
    //   this.$emit("updateFoodCount", { isAdd, food: this.food });

    //   console.log(this.food);
    // },
    // updateFoodCount(isAdd) {
    //   const { food } = this;
    //   if (isAdd) {
    //     if (!food.count) {
    //       // food.count = 1;
    //       this.$set(food, "count", 1);
    //       console.log(food.count);
    //     } else {
    //       food.count++;
    //     }
    //   } else {
    //     if (food.count) food.count--;
    //   }
    //   console.log(food.count);
    // },
    updateFoodCount(isAdd) {
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.cartcontrol
  line-height 24px
  font-size 24px
  .icon-jianhao
    float left
    font-size 24px
    padding 6px
    &.move-enter-active, &.move-leave-active
      transition all 0.3s
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    float left
    width 12px
    font-size 10px
    line-height 36px
    text-align center
    // vertical-align top
    color rgb(147, 153, 159)
  .icon-jiahao1
    float left
    color green
    font-size 24px
    padding 6px
</style>
