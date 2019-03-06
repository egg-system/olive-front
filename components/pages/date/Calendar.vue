<template>
  <div class="component-wrapper">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>日時を選択してください</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
                      <td v-if="dateData.disable !== undefined || isPastTime(dateData.date + time)" class="disabled">-</td>
                      <td v-else-if="findRemainOfTime(dateData.time_slots, time) == 0" class="disabled">×</td>
                      <td v-else-if="isTwoHour() && !isNextTimeRemaining(dateData.time_slots, time)" class="disabled">
                        {{ findRemainOfTime(dateData.time_slots, time) | remainFormat }}
                      </td>
                      <td v-else @click="selectTime(time)">
                        {{ findRemainOfTime(dateData.time_slots, time) | remainFormat }}
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
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
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
      let day = moment(value).day()
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
    },
    dayClass: function(value) {
      let day = moment(value).day()
      if (day == 0) {
        return 'holiday'
      } else if (day == 6) {
        return 'saturday'
      }
      return ''
    }
  },
  data: function() {
    return { twoHoursCheck: false }
  },
  computed: {
    timeSlots() {
      let shop = this.$store.state.shop
      let slots = []
      for (let time = shop.open_at; time < shop.close_at; time++) {
        if (time < shop.break_from || shop.break_to <= time) {
          slots.push(time)
        }
      }
      return slots
    },
    calendar() {
      let calendar = this.$store.state.date.calendar
      let forwarPaddingDates = []
      let rewardPaddingDates = []
      if (0 < calendar.length) {
        let startDate = moment(calendar[0].date)
        let startDay = moment(calendar[0].date).day()
        //取得したデータが週半ばの場合、空白セルを詰める
        if (0 < startDay) {
          for (
            let date = moment(startDate).subtract(startDay, 'days');
            date.isBefore(startDate);
            date = date.add(1, 'days')
          ) {
            let paddingDate = {}
            paddingDate.date = date.format('YYYYMMDD')
            paddingDate.disable = true
            forwarPaddingDates.push(paddingDate)
          }
        }
        let endDate = moment(calendar[calendar.length - 1].date)
        let endDay = moment(calendar[calendar.length - 1].date).day()
        //取得したデータが週の途中で終わる場合、空白セルを詰める
        if (endDay < 6) {
          for (
            let date = moment(endDate).add(1, 'days');
            date.day() != 0;
            date = date.add(1, 'days')
          ) {
            let paddingDate = {}
            paddingDate.date = date.format('YYYYMMDD')
            paddingDate.disable = true
            rewardPaddingDates.push(paddingDate)
          }
        }
      }
      calendar = forwarPaddingDates.concat(calendar)
      calendar = calendar.concat(rewardPaddingDates)

      //一週間ごと配列にわける
      let calendarByWeek = []
      let weekArr = []
      let firstMonth = ''
      let firstMonthDays = 0
      let secondMonth = null
      for (let i = 0; i < calendar.length; i++) {
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
          let e = { data: weekArr, firstMonth: firstMonth }
          if (secondMonth !== null) {
            e.secondMonth = secondMonth
            e.firstMonthDays = firstMonthDays
          }
          calendarByWeek.push(e)
        }
      }
      return calendarByWeek
    },
    isTwoHourMenuSelected() {
      if (!this.isMenuSelected()) {
        return false
      }
      let duration = this.$store.state.select.selectedMenu.minutes
      return duration == 120
    }
  },
  created: function() {
    this.getCalendar()
  },
  methods: {
    selectTime: function(time) {
      this.setSelectedTime(time)
      if (this.isLogin()) {
        this.$router.push({ name: 'registration' })
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    isPastTime: function(time) {
      return moment(time, 'YYYYMMDDkk').isBefore(moment())
    },
    isNextTimeRemaining: function(timeSlots, time) {
      let shop = this.$store.state.shop
      let nextTime = Number(time) + 1
      if (
        (shop.break_from <= nextTime && nextTime < shop.break_to) ||
        shop.close_at <= nextTime
      ) {
        return false
      }
      let nextRemain = this.findRemainOfTime(timeSlots, nextTime.toString())
      return 0 < nextRemain
    },
    findRemainOfTime: function(timeSlots, time) {
      return timeSlots.find(slot => slot.start_time.slice(-2) == time).remain
    },
    ...mapActions({
      getCalendar: 'date/getCalendar'
    }),
    ...mapMutations('select', ['setSelectedTime']),
    ...mapGetters({
      isMenuSelected: 'select/isMenuSelected',
      isTwoHour: 'select/isTwoHour',
      isLogin: 'login/isLogin'
    })
  }
}
</script>
<style lang="scss">
$disabledColor: #d9d9d9;
.component-wrapper {
  margin-top: 40px;
  .calendar {
    text-align: center;
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
}
</style>
