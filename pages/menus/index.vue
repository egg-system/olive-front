<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <customer-must-update-error v-if="customerMustUpdate"/>
        <template v-else>
          <password-alert v-if="hasSubShop"/>
          <loading v-if="isLoading" class="loading"/>
          <div :class="{ hidden: isLoading }">
            <registration-menu
              v-if="menuIndex == 1"
              :if-show-only-first-menu="true"
              :is-first="false"
            />
            <menu-list/>
          </div>
        </template>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MenuList from '~/components/pages/menus/MenuList.vue'
import Loading from '~/components/layouts/Loading.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import PasswordAlert from '~/components/pages/common/PasswordAlert.vue'
import CustomerMustUpdateError from '~/components/pages/common/CustomerMustUpdateError.vue'

export default {
  middleware: ['init-menu-index', 'init-shop-id'],
  fetch({ store }) {
    store.dispatch('menu/getMenus', { shopId: store.state.shop.id })
  },
  components: {
    MenuList,
    Loading,
    RegistrationMenu,
    PasswordAlert,
    CustomerMustUpdateError
  },
  computed: {
    menuIndex() {
      return this.$store.state.select.menuIndex
    },
    ...mapGetters('menu', ['isLoading', 'hasSubShops']),
    ...mapGetters('login', ['customerMustUpdate'])
  }
}
</script>

<style lang="scss" scoped>
.menu-contents {
  text-align: left;
}
.v-input--selection-controls .v-input__control,
.v-input--selection-controls {
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
.menu {
  margin-bottom: 30px;
}

nav.v-toolbar.theme--light {
  background-color: #fffde7;
}
.layout.column .flex.xs6 {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: rgb(255, 253, 231);
}
.warning {
  width: 80%;
}
.layout.column .flex.xs6 button {
  width: 80%;
}
.layout.column .flex.xs6 button .v-btn__content {
  display: block;
  width: 100%;
}
</style>
