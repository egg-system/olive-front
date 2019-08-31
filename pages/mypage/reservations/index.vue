<template>
  <div>

    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧</h3></v-card-text>
      </v-card>
    </v-flex>

    <h3><p class="under">予約一覧</p></h3>
    <mypage-reserve-history/>
    <mypage-list-pagination/>

  </div>
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
      login: state => state.login
    })
  }
}
</script>
