<style lang="scss">
td {
  padding: 5px;
}
.category-name {
  background: #d9d9d9;
}
</style>
<template>
  <section class="container">
    <div>
      <section class="selected-menu">
        <h1>{{ store.name }}</h1>
        <div class="text-xs-center">
          <h2>日時を選択してください</h2>
          <h3>選択済メニュー</h3>
          <table>
            <tr v-for="menu in selectedMenus" :key="'menu'+menu.id">
              <td class="category-name">{{ menu.categoryName }}</td>
              <td>{{ menu.menuName }}</td>
              <td>{{ menu.price }}円（税抜）</td>
              <td>{{ menu.duration }}分</td>
            </tr>
          </table>
          <p>※2時間のご予約をご希望の方</p>
          <p><input type="checkbox">2時間のご予約をご希望の方はこちらをチェックしてください。</p>
          <h3>日時選択</h3>
        </div>
      </section>

      <section class="calendar">
        <table v-for="(weekData, index) in calendar" :key="'weekData'+index">
          <tbody>
            <tr>
              <td v-if="weekData.secondMonth === undefined" colspan="8">{{ weekData.firstMonth | monthFormat }}</td>
              <td v-if="weekData.secondMonth !== undefined" :colspan="weekData.firstMonthDays + 1">{{ weekData.firstMonth | monthFormat }}</td>
              <td v-if="weekData.secondMonth !== undefined" :colspan="7 - weekData.firstMonthDays">{{ weekData.secondMonth | monthFormat }}</td>
            </tr>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr><td>&nbsp;&nbsp;</td></tr>
                    <tr><td>&nbsp;&nbsp;</td></tr>
                    <tr v-for="time in timeSlots" :key="time+'time_title'">
                      <td>{{ time | hourFormat }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td v-for="dateData in weekData.data" :key="'dateDate'+dateData.date">
                <table>
                  <tbody>
                    <tr><td>{{ dateData.date | dateFormat }}</td></tr>
                    <tr><td>{{ dateData.date | dayFormat }}</td></tr>
                    <tr v-for="time in timeSlots" :key="time+'time_title'">
                      <td v-if="dateData.disable !== undefined">-</td>
                      <td v-else-if="dateData.date_slot.find(slot => slot.start_time.slice(-2) == time).remain == 0">×</td>
                      <td v-else>
                        <a @click="selectTime(time)">
                          {{ dateData.date_slot.find(slot => slot.start_time.slice(-2) == time).remain | remainFormat }}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>
</template>


<script>
import moment from 'moment'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  filters: {
    monthFormat: function(value) {
      return moment(value).format('YYYY年M月')
    },
    hourFormat: function(value) {
      return moment(value, 'kk').format('kk:mm')
    },
    dateFormat: function(value) {
      return moment(value).format('D')
    },
    remainFormat: function(value) {
      if (value <= 0) {
        return '×'
      } else if (value < 3) {
        return value
      } else {
        return '○'
      }
    },
    dayFormat: function(value) {
      var day = moment(value).day()
      var dayDisp = ''
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
    }
  },
  computed: {
    store() {
      return this.$store.state.store
    },
    selectedMenus() {
      var menuCategories = this.$store.state.menu.menuCategories
      var selectedMenuIds = this.$store.state.menu.selectedMenuIds
      var selectedMenus = []

      for (var menuId of selectedMenuIds) {
        for (var menuCategory of menuCategories) {
          var selectedMenu = menuCategory.menus.find(menu => menu.id === menuId)
          if (selectedMenu !== undefined) {
            selectedMenus.push({
              id: selectedMenu.id,
              categoryName: menuCategory.name,
              menuName: selectedMenu.name,
              price: selectedMenu.price_without_tax,
              duration: selectedMenu.duration_minutes
            })
          }
        }
      }
      return selectedMenus
    },
    timeSlots() {
      let store = this.$store.state.store
      var slots = []
      for (let time = store.open_at; time < store.close_at; time++) {
        if (time < store.break_from || store.break_to <= time) {
          slots.push(time)
        }
      }
      return slots
    },
    calendar() {
      var calendar = this.$store.state.date.calendar
      var forwarPaddingDates = []
      var rewardPaddingDates = []
      if (0 < calendar.length) {
        var startDate = moment(calendar[0].date)
        var startDay = moment(calendar[0].date).day()
        if (0 < startDay) {
          for (
            var date = moment(startDate).subtract(startDay, 'days');
            date.isBefore(startDate);
            date = date.add(1, 'days')
          ) {
            var paddingDate = {}
            paddingDate.date = date.format('YYYYMMDD')
            paddingDate.disable = true
            forwarPaddingDates.push(paddingDate)
          }
        }
        var endDate = moment(calendar[calendar.length - 1].date)
        var endDay = moment(calendar[calendar.length - 1].date).day()
        if (endDay < 6) {
          for (
            var date = moment(endDate).add(1, 'days');
            date.day() != 0;
            date = date.add(1, 'days')
          ) {
            var paddingDate = {}
            paddingDate.date = date.format('YYYYMMDD')
            paddingDate.disable = true
            rewardPaddingDates.push(paddingDate)
          }
        }
      }
      calendar = forwarPaddingDates.concat(calendar)
      calendar = calendar.concat(rewardPaddingDates)

      //一週間ごと配列にわける
      var calendarByWeek = []
      var weekArr = []
      var firstMonth = ''
      var firstMonthDays = 0
      var secondMonth = null
      for (var i = 0; i < calendar.length; i++) {
        if (i % 7 === 0) {
          weekArr = []
          firstMonth = calendar[i].date
          firstMonthDays = 0
          secondMonth = null
        }
        weekArr.push(calendar[i])
        if (
          moment(calendar[i].date).month() !== moment(firstMonth).month() &&
          secondMonth === null
        ) {
          secondMonth = calendar[i].date
          firstMonthDays = i % 7
        }
        if (i % 7 === 6) {
          var e = { data: weekArr, firstMonth: firstMonth }
          if (secondMonth !== null) {
            e.secondMonth = secondMonth
            e.firstMonthDays = firstMonthDays
          }
          calendarByWeek.push(e)
        }
      }
      return calendarByWeek
    }
  },
  created: function() {
    var selectedMenuIds = this.$store.state.menu.selectedMenuIds
    if (selectedMenuIds.length === 0) {
      this.$router.push({ name: 'menu' })
    }
    this.getCalendar()
  },
  methods: {
    selectTime: function(time) {
      this.setSelectedTime(time)
      this.$router.push({ name: 'login' })
    },
    ...mapActions({
      getCalendar: 'date/getCalendar',
      setSelectedTime: 'select/selectTime'
    })
  }
}
</script>
