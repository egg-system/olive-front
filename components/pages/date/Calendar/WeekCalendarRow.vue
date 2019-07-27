<template>
  <table class="outer-table">
    <tbody>
      <tr>
        <th v-if="!hasTwoMonth" :id="firstMonthId" colspan="8">
          {{ firstDate | monthFormat }}
          <a v-if="nextMonthLink" :href="firstMonthLink">来月へ</a>
        </th>
        <th v-if="hasTwoMonth" :colspan="firstMonthCount + 1">{{ firstDate | monthFormat }}</th>
        <th v-if="hasTwoMonth" :id="lastMonthId" :colspan="7 - firstMonthCount">
          {{ lastDate | monthFormat }}
          <a v-if="nextMonthLink" :href="lastMonthLink">来月へ</a>
        </th>
      </tr>
      <tr>
        <td class="col-data-wrapper">
          <table class="inner-table">
            <tbody>
              <tr>
                <td>&nbsp;&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;&nbsp;</td>
              </tr>
              <tr v-for="time in timeSlotStrings" :key="time">
                <td>{{ time | hourFormat }}</td>
              </tr>
            </tbody>
          </table>
        </td>
        <date-calendar-row
          v-for="dateData in weekData"
          :key="dateData.toString()"
          :date-data="dateData"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import DateCalendarRow from './DateCalendarRow.vue'

export default {
  components: { DateCalendarRow },
  filters: {
    monthFormat(value) {
      return moment(value).format('M月')
    },
    hourFormat(value) {
      return moment(value).format('HH:mm')
    }
  },
  props: {
    weekData: {
      type: Array,
      required: true
    },
    lastMonth: {
      type: Number,
      required: true
    }
  },
  computed: {
    firstDate() {
      return this.weekData[0]
    },
    lastDate() {
      return this.weekData[6]
    },
    firstMonthCount() {
      return this.firstMonthDates.length
    },
    firstMonthDates() {
      const firstMonth = this.firstDate.month()
      return this.weekData.filter(dateData => dateData.month() === firstMonth)
    },
    hasTwoMonth() {
      return this.firstMonthCount !== this.weekData.length
    },
    timeSlotStrings() {
      return this.timeSlots.map(timeSlot => timeSlot.toString())
    },
    firstMonthId() {
      if (this.firstDate.date() == 1) {
        return 'next-month' + (this.firstDate.month() + 1)
      }
      return (
        'next-month' +
        (this.firstDate.month() + 1) +
        '-' +
        this.firstDate.date()
      )
    },
    lastMonthId() {
      return 'next-month' + (this.lastDate.month() + 1)
    },
    nextMonthLink() {
      return this.lastMonth != this.firstDate.month()
    },
    firstMonthLink() {
      return '#next-month' + (this.firstDate.month() + 2)
    },
    lastMonthLink() {
      return '#next-month' + (this.lastDate.month() + 2)
    },
    ...mapGetters('date', ['timeSlots'])
  }
}
</script>
