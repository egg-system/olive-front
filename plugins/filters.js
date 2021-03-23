import Vue from 'vue'
import moment from 'moment'

const getDay = value => {
  const dayDisps = ['日', '月', '火', '水', '木', '金', '土']
  const dayIndex = moment(value).day()
  return dayDisps[dayIndex]
}

Vue.filter('priceFormat', val => {
  return isNaN(val) ? '' : '¥' + val.toLocaleString() + '(税抜)'
})

Vue.filter('priceTaxExceptFormat', val => {
  return isNaN(val) ? '' : '¥' + val.toLocaleString()
})

Vue.filter('priceTaxIncludeFormat', (val, rate) => {
  return isNaN(val) ? '' : '¥' + (val * rate).toLocaleString()
})

Vue.filter('priceTaxIncludeFormatWithZeikomi', (val, rate) => {
  return isNaN(val) ? '' : '¥' + (val * rate).toLocaleString() + '(税込)'
})

Vue.filter('timeFormat', val => {
  return val ? val + '分' : ''
})

Vue.filter('dayFormat', val => getDay(val))

Vue.filter('dateTimeAndDatFormat', value => {
  const format = `YYYY年MM月DD日 (${getDay(value)}) HH:mm`
  return moment(value).format(format)
})
