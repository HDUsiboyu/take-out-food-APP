/*
直接更新state的多个方法的对象
*/
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART,
    SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'
export default {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        console.log(userInfo);

        state.userInfo = userInfo
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        // console.log(userInfo);

        state.ratings = ratings
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [ADD_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            Vue.set(food, 'count', 1)
            state.shopCart.push(food)
        }
        else {
            food.count++ // shopCart相应改变
        }
    },
    [REDUCE_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--
            if (!food.count)
                //将food从shopCart中移除
                state.shopCart.splice(state.shopCart.indexOf(food), 1)
        }

    },
    [CLEAR_CART](state, { shopCart }) {
        //清除food中的count
        state.shopCart.forEach(food => {
            food.count = 0
            return food
        })
        state.shopCart = shopCart
    },
    [SEARCH_SHOPS](state, { searchShops }) {
        state.searchShops = searchShops
    }
}