/*
包含多个基于state的getter计算属性的对象
*/
export default {
    totalCount(state) {
        return state.shopCart.reduce((preTotal, food) => {
            return preTotal + food.count
        }, 0)
    },
    totalPrice(state) {
        return state.shopCart.reduce((preTotal, food) => {
            return preTotal + food.count * food.price
        }, 0)
    },
    positiveCount(state) {
        return state.ratings.reduce((preTotal, rating) => {
            return preTotal + (rating.rateType == 0 ? 1 : 0)
        }, 0)
    }
}