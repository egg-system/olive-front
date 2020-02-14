<template>
  <v-container>
    <v-layout column>
      <customer-must-update-error v-if="customerMustUpdate" />
      <template v-else>
        <loading v-if="isLoading" class="loading" />
        <div :class="{ hidden: isLoading }">
          <registration-menu
            v-if="menuIndex == 1"
            :if-show-only-first-menu="true"
            :is-first="false"
          />
          <menu-list />
        </div>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import MenuList from '~/components/pages/menus/MenuList.vue'
import Loading from '~/components/layouts/Loading.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import CustomerMustUpdateError from '~/components/pages/common/CustomerMustUpdateError.vue'

export default {
  middleware: ['init-menu-index', 'init-shop-id'],
  watchQuery: ['shopId'],
  components: {
    MenuList,
    Loading,
    RegistrationMenu,
    CustomerMustUpdateError
  },
  async fetch({ store, query, error }) {
    if (store.state.shop.id && store.getters['menu/hasSubShops']) {
      return
    }

    // shopIdがnullの場合は1をセットする
    const shopId = query.shopId || 1
    try {
      await Promise.all([
        store.dispatch('shop/getShop', { id: shopId }),
        store.dispatch('menu/getMenus', { shopId })
      ])
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
  },
  computed: {
    ...mapState('reservation/select', ['menuIndex']),
    ...mapGetters('menu', ['isLoading', 'hasSubShops']),
    ...mapGetters('user', ['customerMustUpdate'])
  }
}
</script>

<style lang="scss" scoped>
</style>
