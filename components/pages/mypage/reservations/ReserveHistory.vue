<template>
  <v-layout justify-center column>
    <template v-for="data in reserveData">
      <v-flex
        :key="data.id"
        d-flex
        xs12
        mad4
        class="card-width"
      >
        <reserve-data :data="data" :force-hide-cancel="forceHideCancel"/>
      </v-flex>
    </template>
  </v-layout>
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

<style>
.v-card__title,
.v-card__text {
  color: black;
}
.number {
  display: inline;
  font-size: 30px;
}
.card-width {
  width: 80%;
  margin: 0 auto;
}
@media screen and (max-width: 767px) {
  .card-width {
    width: 90%;
  }
}
.shop {
  margin-top: 12px;
}
.text-menu {
  text-align: right;
}
.text-value {
  text-align: left;
}
.card-main {
  margin-top: 12px;
  margin-bottom: 12px;
}
.cancel-btn {
  width: 10px;
}
.v-btn__content {
  font-size: 1em;
  font-weight: normal;
}
</style>
