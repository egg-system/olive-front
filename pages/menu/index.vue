<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <loading v-if="isLoading" class="loading"/>
        <div :class="{ hidden: isLoading }">
          <shop-name/>
          <registration-menu
            v-if="menuIndex == 1"
            :if-show-only-first-menu="true"
            :is-first="false"
          />
          <menu-list/>
        </div>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import MenuList from '~/components/pages/menu/MenuList.vue'
import Loading from '~/components/layouts/Loading.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'

export default {
  components: {
    ShopName,
    MenuList,
    Loading,
    RegistrationMenu
  },
  computed: {
    menuIndex() {
      return this.$store.state.select.menuIndex
    },
    ...mapGetters({
      isLoading: 'menu/isLoading'
    })
  }
}
</script>

<style lang="scss">
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
</style>
