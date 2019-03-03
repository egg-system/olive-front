<template>
  <section class="selected-menu">
    <div>
      <registration-menu :is-first="false"/>
      <v-flex v-if="!isTwoHourMenuSelected">
        <v-checkbox v-model="twoHoursCheck" :label="'2時間のご予約をご希望の方はこちらをチェックしてください。'"/>
      </v-flex>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
export default {
  components: {
    RegistrationMenu
  },
  computed: {
    twoHoursCheck: {
      get() {
        return this.$store.state.select.twoHoursCheck
      },
      set(val) {
        this.setTwoHoursCheck(val)
      }
    },
    isTwoHourMenuSelected: function() {
      let minutes = this.$store.state.select.menu.minutes
      return minutes == 120
    }
  },
  methods: {
    ...mapMutations('select', ['setTwoHoursCheck'])
  }
}
</script>
