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
</style>

<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <loading v-if="isLoading" class="loading"/>
        <div :class="{ hidden: isLoading }" >
          <shop-name />
          <menu-list />
          <reserve-btn/>
        </div>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import ReserveBtn from '~/components/pages/menu/ReserveBtn.vue'
import MenuList from '~/components/pages/menu/MenuList.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  components: {
    ShopName,
    ReserveBtn,
    MenuList,
    Loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'menu/isLoading'
    })
  }
}
</script>
