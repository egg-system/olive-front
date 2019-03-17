import Vue from 'vue'
import moment from 'moment'

Vue.filter('priceFormat', val => {
  return val ? '¥' + val.toLocaleString() + '(税抜き)' : ''
})

Vue.filter('timeFormat', val => {
  return val ? val + '分' : ''
})

Vue.filter('dayFormat', val => {
  let day = moment(val).day()
  let dayDisp = ''
  switch (day) {
    case 0:
      dayDisp = '日'
      break
    case 1:
      dayDisp = '月'
      break
    case 2:
      dayDisp = '火'
      break
    case 3:
      dayDisp = '水'
      break
    case 4:
      dayDisp = '木'
      break
    case 5:
      dayDisp = '金'
      break
    case 6:
      dayDisp = '土'
      break
  }
  return '(' + dayDisp + ')'
})
