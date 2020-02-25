<template>
  <div class="mt-8">
    <v-layout justify-center>
      <v-flex xs12 sm8 md7
              lg6
              xl4
      >
        <v-card color="red lighten-2">
          <v-card-text class="text-center white--text">
            <h3>日時を選択してください</h3>
          </v-card-text>
        </v-card>

        <section class="text-center">
          <div class="elevation-1">
            <week-calendar-row
              v-for="(weekData, index) in calendarWeeks"
              :key="index"
              :week-data="weekData"
            />
          </div>
        </section>
        
        <section>
          <v-card class="mt-8">
            <v-card-title>
              予約表の表記について
            </v-card-title>
            <v-layout>
              <v-flex xs3>
                <p class="text-center">
                  ー
                </p>
              </v-flex>
              <v-flex xs9>
                <p>：ご予約できません。</p>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs3>
                <p class="text-center">
                  ○・数字
                </p>
              </v-flex>
              <v-flex xs9>
                <p>：ご予約できます。予約可能な残数を示しています。</p>
              </v-flex>
            </v-layout> 
            <v-layout>
              <v-flex xs3>
                <p class="text-center">
                  ×
                </p>
              </v-flex>
              <v-flex xs9>
                <p>
                  ：ご予約が埋まっておりお取りする事が出来ません。キャンセルなどで空きが出来しだい数字に変わります。
                </p>
              </v-flex>
            </v-layout>
          </v-card>
        </section>
      </v-flex>
    </v-layout>
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

<style scoped lang="scss">
@import '@/assets/date/variables.scss';
</style>
