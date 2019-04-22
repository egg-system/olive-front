<template>
  <div class="component-wrapper">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text>
            <h3>日時を選択してください</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <section class="calendar">
      <div class="table-wrapper">
        <div class="elevation-1">
          <week-calendar-row
            v-for="(weekData, index) in calendarWeeks"
            :key="index"
            :week-data="weekData"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import WeekCalendarRow from './Calendar/WeekCalendarRow.vue'

export default {
  components: { WeekCalendarRow },
  computed: {
    calendarWeeks() {
      return _.chunk(this.calendarDates, 7)
    },
    calendarDates() {
      const calendarDates = []
      let calendarDate = this.startDate.clone()

      while (calendarDate.isBefore(this.endDate)) {
        calendarDates.push(calendarDate)
        calendarDate = calendarDate.add(1, 'days').clone()
      }

      return calendarDates
    },
    ...mapGetters('date', ['startDate', 'endDate'])
  }
}
</script>

<style lang="scss">
@import '../../../assets/calendar.scss';
</style>
