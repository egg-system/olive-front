<template>
  <v-container>
    <loading v-if="isLoading" class="loading" />
    <div :class="{ hidden: isLoading }">
      <v-layout column>
        <registration-menu :is-first="false" />
        <anchor-to-other-shop-list v-if="$store.state.shop.near_stores.length > 0" />
        <calendar />
        <other-shop-list v-if="$store.state.shop.near_stores.length > 0" />
        <back-btn />
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import AnchorToOtherShopList from '~/components/pages/date/AnchorToOtherShopList.vue'
import OtherShopList from '~/components/pages/date/OtherShopList.vue'
import Calendar from '~/components/pages/date/Calendar.vue'
import BackBtn from '~/components/pages/date/BackBtn.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  middleware: ['init-shop-id', 'clear-selected-date', 'fetch-menus-from-query'],
  components: {
    RegistrationMenu,
    AnchorToOtherShopList,
    OtherShopList,
    Calendar,
    BackBtn,
    Loading
  },
  async fetch({ store, error, route, redirect }) {
    try {
      // カレンダーを取得
      await Promise.all([
        store.dispatch('reservation/date/getCalendar'),
        store.dispatch('tax/getTax', {})
      ])
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
  },
  computed: {
    ...mapGetters('reservation/date', ['isLoading'])
  }
}
</script>

<style scoped lang="scss">
</style>
