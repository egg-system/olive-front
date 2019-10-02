<template>
  <section class="container">
    <loading v-if="isLoading" class="loading"/>
    <div :class="{ hidden: isLoading }">
      <v-container grid-list-xl>
        <v-layout column wrap class="menu-contents">
          <registration-menu :is-first="false"/>
          <calendar/>
          <back-btn/>
        </v-layout>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import qs from 'qs'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import Calendar from '~/components/pages/date/Calendar.vue'
import BackBtn from '~/components/pages/date/BackBtn.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  middleware: ['init-shop-id'],
  components: {
    RegistrationMenu,
    Calendar,
    BackBtn,
    Loading
  },
  computed: {
    ...mapGetters('reservation/date', ['isLoading'])
  },
  async fetch({ store, error, route, redirect }) {
    try {
      const queryString = route.fullPath.match(/\?(.+)$/)
      if (!Array.isArray(queryString) || queryString.length <= 1) {
        redirect('/menus/')
      }
      const _query = qs.parse(queryString[1])
      if (
        !_query.storeId ||
        !_query.shopId ||
        !Array.isArray(_query.menus) ||
        !_query.menus.length
      ) {
        redirect('/menus/')
      }

      // queryの情報を使ってメニューを取得
      await store.dispatch('menu/getMenus', { shopId: _query.shopId })
      const allMenus = store.getters['menu/allMenus']
      const menus = allMenus
        .map(menu => {
          const _menu = _query.menus.find(
            qMenu => parseInt(menu.id) === parseInt(qMenu.menuId)
          )
          if (!_menu) return null

          const _optionIds = _menu.optionIds ? _menu.optionIds.split(',') : null
          let options = null
          if (
            Array.isArray(menu.options) &&
            menu.options.length > 0 &&
            _optionIds
          ) {
            options = menu.options.filter(option =>
              _optionIds.includes(String(option.id))
            )
          }
          const mimitsuboCount = _menu.mimitsuboCount || 0

          return {
            menu,
            options,
            mimitsuboCount
          }
        })
        .filter(menu => menu)
      // 値をセット
      store.commit('reservation/select/setMenus', menus)
      store.commit('reservation/select/setStoreId', _query.storeId)

      // カレンダーを取得
      await store.dispatch('reservation/date/getCalendar')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
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
