<template>
  <v-container grid-list-lg class="min-height">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>
              マイページトップ > 予約一覧
            </h3>
          </v-card-text>
        </v-card>

        <h3>
          予約一覧
          <hr color="#ef9a9a">
        </h3>
        <mypage-reserve-history />
        <mypage-list-pagination />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MypageReserveHistory from '~/components/pages/mypage/reservations/ReserveHistory.vue'
import MypageListPagination from '~/components/pages/mypage/reservations/Pagination.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'mypage',
  middleware: ['fetch-reservations'],
  components: {
    MypageReserveHistory,
    MypageListPagination
  },
  computed: {
    isShownCancelBtn() {
      if ('cancel' in this.$route.query) {
        return this.$route.query.cancel
      }

      return false
    },
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
