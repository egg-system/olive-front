<template>
  <table class="outer-table">
    <tbody>
      <tr>
        <th v-if="!hasTwoMonth" colspan="8">
          {{ firstDate | monthFormat }}
        </th>
        <th v-if="hasTwoMonth" :colspan="firstMonthCount + 1">
          {{ firstDate | monthFormat }}
        </th>
        <th v-if="hasTwoMonth" :colspan="7 - firstMonthCount">
          {{ lastDate | monthFormat }}
        </th>
      </tr>
      <tr>
        <td class="col-data-wrapper">
          <table class="inner-table">
            <tbody>
              <tr class="inner-table">
                <td>&nbsp;&nbsp;</td>
              </tr>
              <tr class="inner-table">
                <td>&nbsp;&nbsp;</td>
              </tr>
              <tr
                v-for="time in timeSlots" :key="time.toString()"
                class="inner-table"
              >
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
    ...mapGetters('reservation/date', ['timeSlots'])
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/date/variables.scss';
@import '@/assets/date/date-column.scss';

table.outer-table {
  border-right: 1px $borderColor solid;
  width: 100%;
}
</style>
