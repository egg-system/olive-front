<template>
  <section class="container">
    <loading v-if="isLoading" class="loading"/>
    <div :class="{ hidden: isLoading }" >
      <v-container grid-list-xl>
        <v-layout column wrap class="menu-contents">
          <shop-name />
          <menu-section />
          <calendar />
          <back-btn/>
        </v-layout>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import MenuSection from '~/components/pages/date/MenuSection.vue'
import Calendar from '~/components/pages/date/Calendar.vue'
import BackBtn from '~/components/pages/date/BackBtn.vue'
import Loading from '~/components/layouts/Loading.vue'

export default {
  components: {
    MenuSection,
    ShopName,
    Calendar,
    BackBtn,
    Loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'date/isLoading'
    })
  },
  created: function() {
    let selectedMenu = this.$store.state.select.selectedMenu
    if (selectedMenu === null) {
      this.$router.push({ name: 'menu' })
    }
    this.setTwoHoursCheck(false)
  },
  methods: {
    ...mapMutations('select', ['setTwoHoursCheck'])
  }
}
</script>
