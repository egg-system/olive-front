<template>
  <section class="container">
    <loading v-if="isLoading" class="loading"/>
    <div :class="{ hidden: isLoading }">
      <v-container grid-list-xl>
        <v-layout column wrap class="menu-contents">
          <shop-name/>
          <registration-menu :is-first="false"/>
          <calendar/>
          <back-btn/>
        </v-layout>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import Calendar from '~/components/pages/date/Calendar.vue'
import BackBtn from '~/components/pages/date/BackBtn.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  middleware: 'isMenuSelected',
  components: {
    RegistrationMenu,
    ShopName,
    Calendar,
    BackBtn,
    Loading
  },
  computed: {
    ...mapGetters('date', ['isLoading'])
  },
  created() {
    this.getCalendar()
  },
  methods: {
    ...mapActions('date', ['getCalendar'])
  }
}
</script>
