<template>
  <td class="col-data-wrapper">
    <table class="inner-table">
      <tbody>
        <tr class="inner-table">
          <td>{{ dateData | dateFormat }}</td>
        </tr>
        <tr class="inner-table">
          <td :class="dateData | dayClass">
            {{ dateData | dayFormat }}
          </td>
        </tr>
        <time-calendar-row
          v-for="dateTimeData in dateTimeSlots"
          :key="dateTimeData.toString()"
          :date-time-slot="dateTimeData"
        />
      </tbody>
    </table>
  </td>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import TimeCalendarRow from './TimeCalendarRow.vue'

export default {
  components: { TimeCalendarRow },
  filters: {
    dateFormat(value) {
      return moment(value).format('D')
    },
    // 曜日ごとに別のクラスを付与する
    dayClass(value) {
      switch (moment(value).day()) {
        case 0:
          return 'holiday'
        case 6:
          return 'saturday'
        default:
          return ''
      }
    }
  },
  props: {
    dateData: {
      type: Object,
      required: true
    }
  },
  computed: {
    dateTimeSlots() {
      return this.timeSlots.map(timeSlot => {
        const date = this.dateData.format('YYYY-MM-DD')
        const time = timeSlot.format('HH:mm:ss')

        const dateTime = `${date} ${time}`
        return moment(dateTime)
      })
    },
    ...mapGetters('reservation/date', ['timeSlots'])
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/date/date-column.scss';

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.holiday {
  color: #ff4500;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.saturday {
  color: darkblue;
}
</style>
