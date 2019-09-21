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
    <section>
      <div class="calendar-explain">
        <v-card>
          <v-card-title>予約表の表記について</v-card-title>
          <v-card-text>
            <dl>
              <div>
                <dt>-</dt>：
                <dd>ご予約できません。</dd>
              </div>
              <div>
                <dt>○・数字</dt>：
                <dd>ご予約できます。予約可能な残数を示しています。</dd>
              </div>
              <div>
                <dt>×</dt>：
                <dd>
                  ご予約が埋まっておりお取りする事が出来ません。
                  <br>キャンセルなどで空きが出来しだい数字に変わります。
                </dd>
              </div>
            </dl>
          </v-card-text>
        </v-card>
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
        calendarDates.push(calendarDate.clone())
        calendarDate = calendarDate.add(1, 'days')
      }

      return calendarDates
    },
    ...mapGetters('reservation/date', ['startDate', 'endDate'])
  }
}
</script>

<style lang="scss">
@import '../../../assets/calendar.scss';
</style>
