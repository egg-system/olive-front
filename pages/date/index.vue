<template>
  <section class="container">
    <loading v-if="isLoading" class="loading" />
    <div :class="{ hidden: isLoading }">
      <v-container grid-list-xl>
        <v-layout column wrap class="menu-contents">
          <registration-menu :is-first="false" />
          <calendar />
          <back-btn />
        </v-layout>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import Calendar from '~/components/pages/date/Calendar.vue'
import BackBtn from '~/components/pages/date/BackBtn.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  middleware: ['init-shop-id', 'clear-selected-date', 'fetch-menus-from-query'],
  components: {
    RegistrationMenu,
    Calendar,
    BackBtn,
    Loading
  },
  async fetch({ store, error, route, redirect }) {
    try {
      // カレンダーを取得
      await store.dispatch('reservation/date/getCalendar')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
  },
  computed: {
    ...mapGetters('reservation/date', ['isLoading'])
  }
}
</script>

<style scoped>
.component-wrapper .calendar th,
.component-wrapper
  .calendar
  .table-wrapper
  table.outer-table
  td.col-data-wrapper:nth-of-type(1),
.component-wrapper
  .calendar
  .table-wrapper
  table.outer-table
  td.col-data-wrapper
  table.inner-table
  tr:nth-of-type(1),
.component-wrapper
  .calendar
  .table-wrapper
  table.outer-table
  td.col-data-wrapper
  table.inner-table
  tr:nth-of-type(2) {
  background-color: #f8f8f8;
}
.v-card__text dl dd {
  text-align: left !important;
}
</style>
