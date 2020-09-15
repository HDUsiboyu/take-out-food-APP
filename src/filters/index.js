import Vue from 'vue'
// import Moment from 'moment'
import format from 'date-fns/format'

Vue.filter('dataString', function (value, formatStr = 'yyyy-MM-dd HH:mm:ss') {
    // return Moment(value).format(format)
    return format(value, formatStr)
})