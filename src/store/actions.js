/*
通过mutation间接更新atate的多个方法的对象
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
import { reqAddress, reqCategorys, reqShops, reqUser, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo, reqSearchShops } from '../api'

export default {
    //异步获取地址
    async getAddress({ commit, state }) {
        //发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        //提交一个mutation
        if (result.code == 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, { address })
        }
    },
    //异步获取分类列表
    async getCategorys({ commit }) {
        //发送异步ajax请求
        const result = await reqCategorys()
        //提交一个mutation
        if (result.code == 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },
    //异步获取商家列表
    async getShops({ commit, state }) {
        //发送异步ajax请求
        const { latitude, longitude } = state
        const result = await reqShops({ latitude, longitude })
        //提交一个mutation
        if (result.code == 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    //同步记录用户信息
    recordUserInfo({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    //异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUser()
        if (result.code == 0) {
            // console.log("1");
            commit(RECEIVE_USER_INFO, { userInfo: result.data })
            // console.log(userInfo);
        }
    },
    //异步登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code == 0) {
            commit(RECEIVE_USER_INFO, { userInfo: {} })
        }
    },
    //异步获取商品信息
    async getShopGoods({ commit }, callback) {
        //发送异步ajax请求
        const result = await reqShopGoods()
        //提交一个mutation
        if (result.code == 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            callback && callback()
        }
    },
    //异步获取商家评价列表
    async getShopRatings({ commit }) {
        //发送异步ajax请求
        const result = await reqShopRatings()
        //提交一个mutation
        if (result.code == 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
        }
    },
    //异步获取商家信息列表
    async getShopInfo({ commit }) {
        //发送异步ajax请求
        const result = await reqShopInfo()
        //提交一个mutation
        if (result.code == 0) {
            const info = result.data
            commit(RECEIVE_INFO, { info })
        }
    },
    //同步更新商品信息
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd)
            commit(ADD_FOOD_COUNT, { food })
        else
            commit(REDUCE_FOOD_COUNT, { food })
    },
    //同步清空购物车
    clearCart({ commit }) {
        commit(CLEAR_CART, { shopCart: [] })
    },
    //异步通过搜索获取商家列表
    async getSearchShops({ commit, state }, { keyword }) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShops({ keyword, geohash })
        if (result.code == 0) {
            commit(SEARCH_SHOPS, { searchShops: result.data })
        }
    }
}