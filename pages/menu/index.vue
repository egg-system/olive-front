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
</style>

<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <shop-name />
        <menu-list />
        <reserve-btn/>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import ReserveBtn from '~/components/pages/menu/ReserveBtn.vue'
import MenuList from '~/components/pages/menu/MenuList.vue'
export default {
  components: {
    ShopName,
    ReserveBtn,
    MenuList
  }
}
</script>
