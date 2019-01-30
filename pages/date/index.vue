<style lang="scss">
$disabledColor: #d9d9d9;
h3,
p {
  margin: 10px 0;
}
.selected-menu {
  text-align: left;
  td {
    padding: 5px;
  }
  .category-name {
    background: #d9d9d9;
  }
}
.calendar {
  table {
    border-spacing: 0px;
  }
  td,
  th {
    border: 1px rgb(0, 0, 0) solid;
    border-spacing: 0px;
    border-right: none;
    border-bottom: none;
  }
  th {
    padding: 5px 0;
  }
  .table-wrapper {
    width: 90%;
    margin: auto;
    border-bottom: 1px rgb(0, 0, 0) solid;
    table.outer-table {
      border-right: 1px rgb(0, 0, 0) solid;
      width: 100%;
      td.col-data-wrapper {
        border-left: none;
        border-top: none;
        table.inner-table {
          width: 100%;
          .holiday {
            color: #ff4500;
          }
          .saturday {
            color: darkblue;
          }
          td {
            padding: 5px 0;
          }
          td.disabled {
            background-color: $disabledColor;
          }
        }
      }
    }
  }
}
</style>
<template>
  <section v-if="0 < selectedMenus.length" class="container">
    <div>
      <h1>{{ store.name }}</h1>
      <section class="selected-menu">
        <div>
          <h2>日時を選択してください</h2>
          <h3>■選択済メニュー</h3>
          <table>
            <tr v-for="menu in selectedMenus" :key="'menu'+menu.id">
              <td class="category-name">{{ menu.categoryName }}</td>
              <td>{{ menu.menuName }}</td>
              <td>{{ menu.price }}円（税抜）</td>
              <td>{{ menu.duration }}分</td>
            </tr>
          </table>
          <p><input id="two-hour-check" type="checkbox"><label for="two-hour-check">2時間のご予約をご希望の方はこちらをチェックしてください。</label></p>
          <h3>■日時選択</h3>
        </div>
      </section>

      <section class="calendar">
        <div class="table-wrapper">
          <table v-for="(weekData, index) in calendar" :key="'weekData'+index" class="outer-table">
            <tbody>
              <tr>
                <th v-if="weekData.secondMonth === undefined" colspan="8">{{ weekData.firstMonth | monthFormat }}</th>
                <th v-if="weekData.secondMonth !== undefined" :colspan="weekData.firstMonthDays + 1">{{ weekData.firstMonth | monthFormat }}</th>
                <th v-if="weekData.secondMonth !== undefined" :colspan="7 - weekData.firstMonthDays">{{ weekData.secondMonth | monthFormat }}</th>
              </tr>
              <tr>
                <td class="col-data-wrapper">
                  <table class="inner-table">
                    <tbody>
                      <tr><td>&nbsp;&nbsp;</td></tr>
                      <tr><td>&nbsp;&nbsp;</td></tr>
                      <tr v-for="time in timeSlots" :key="time+'time_title'">
                        <td>{{ time | hourFormat }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-for="dateData in weekData.data" :key="'dateDate'+dateData.date" class="col-data-wrapper">
                  <table class="inner-table">
                    <tbody>
                      <tr><td>{{ dateData.date | dateFormat }}</td></tr>
                      <tr><td :class="dateData.date | dayClass">{{ dateData.date | dayFormat }}</td></tr>
                      <tr v-for="time in timeSlots" :key="time+'time_title'">
                        <td v-if="dateData.disable !== undefined || $moment(dateData.date + time, 'YYYYMMDDkk').isBefore($moment())" class="disabled">-</td>
                        <td v-else-if="dateData.date_slot.find(slot => slot.start_time.slice(-2) == time).remain == 0" class="disabled">×</td>
                        <td v-else @click="selectTime(time)">
                          {{ dateData.date_slot.find(slot => slot.start_time.slice(-2) == time).remain | remainFormat }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </section>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'

import moment from 'moment'

export default {
  filters: {
    monthFormat: function(value) {
      return moment(value).format('M月')
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
    },
    dayClass: function(value) {
      var day = moment(value).day()
      if (day == 0) {
        return 'holiday'
      } else if (day == 6) {
        return 'saturday'
      }
      return ''
    },
    isPast: function(value) {
      var now = moment()
      var time = moment(value)
      return now.isAfter(time)
    }
  },
  computed: {
    store() {
      return this.$store.state.store
    },
    selectedMenus() {
      return this.$store.getters['select/getSelectedMenus']
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
        var startDate = this.$moment(calendar[0].date)
        var startDay = this.$moment(calendar[0].date).day()
        if (0 < startDay) {
          for (
            var date = this.$moment(startDate).subtract(startDay, 'days');
            date.isBefore(startDate);
            date = date.add(1, 'days')
          ) {
            var paddingDate = {}
            paddingDate.date = date.format('YYYYMMDD')
            paddingDate.disable = true
            forwarPaddingDates.push(paddingDate)
          }
        }
        var endDate = this.$moment(calendar[calendar.length - 1].date)
        var endDay = this.$moment(calendar[calendar.length - 1].date).day()
        if (endDay < 6) {
          for (
            var date = this.$moment(endDate).add(1, 'days');
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
          this.$moment(calendar[i].date).month() !==
            this.$moment(firstMonth).month() &&
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
    var selectedMenuIds = this.$store.state.select.selectedMenuIds
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
    isPast: function(value) {
      var now = this.$moment()
      var time = this.$moment(value)
      return now.isAfter(time)
    },
    ...mapActions({
      getCalendar: 'date/getCalendar',
      setSelectedTime: 'select/selectTime'
    })
  }
}
</script>
