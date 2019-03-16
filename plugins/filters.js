import Vue from 'vue'

Vue.filter('priceFormat', val => {
  return val ? '¥' + val.toLocaleString() + '(税抜き)' : ''
})

Vue.filter('timeFormat', val => {
  return val ? val + '分' : ''
})
