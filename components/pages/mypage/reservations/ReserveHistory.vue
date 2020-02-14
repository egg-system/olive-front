<template>
  <v-container>
    <v-layout justify-center column>
      <template v-for="data in reserveData">
        <v-flex
          :key="data.id"
        >
          <reserve-data :data="data" :force-hide-cancel="forceHideCancel" />
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ReserveData from './ReserveData.vue'

export default {
  components: { ReserveData },
  props: {
    limit: {
      type: Number,
      default: null
    },
    forceHideCancel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    reserveData() {
      const reserveData = this.reservations.filter(
        reservation => !this.id || reservation.id === this.id
      )

      if (this.limit) {
        return reserveData.slice(0, this.limit)
      }

      return reserveData
    },
    ...mapState('reservation', ['reservations'])
  }
}
</script>
