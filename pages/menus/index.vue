<template>
  <section class="container">
    <v-container grid-list-lg>
      <v-layout column wrap class="menu-contents">
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
  </section>
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
/* .menu-contents {
  text-align: left;
} */
/* eslint-disable vue-scoped-css/no-unused-selector */
.v-input--selection-controls .v-input__control,
.v-input--selection-controls {
  /* eslint-disable vue-scoped-css/no-unused-selector */
  width: 100%;
  margin-top: 0px;
  padding-top: 0px;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.hidden {
  display: none;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
nav.v-toolbar.theme--light {
  background-color: #fffde7;
}
</style>
