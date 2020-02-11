<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center my-4">
            <h3>
              マイページトップ
            </h3>
          </v-card-text>
        </v-card>

        <template v-if="isCouponEnabled">
          <h3>
            <p class="under">
              残りの回数券（回数券をお持ちの方のみ)
            </p>
          </h3>
          <mypage-coupon />
        </template>

        <h3>
          予約履歴
          <hr color="#ef9a9a">
        </h3>

        <template v-if="hasReservations">
          <mypage-reserve-history :limit="topPageReservationCount" />
          <mypage-more-btn v-if="isShownMoreButton" />

          <h3 class="mt-4">
            予約キャンセル
            <hr color="#ef9a9a">
          </h3>
          <mypage-cancel-btn />
        </template>

        <v-layout v-else justify-center>
          <v-flex>
            <div>予約履歴がございません。</div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MypageCoupon from '~/components/pages/mypage/Coupon.vue'
import MypageReserveHistory from '~/components/pages/mypage/reservations/ReserveHistory.vue'
import MypageMoreBtn from '~/components/pages/mypage/MoreBtn.vue'
import MypageCancelBtn from '~/components/pages/mypage/CancelBtn.vue'
import { mapState } from 'vuex'

export default {
  layout: 'mypage',
  middleware: ['fetch-reservations'],
  components: {
    MypageCoupon,
    MypageReserveHistory,
    MypageMoreBtn,
    MypageCancelBtn
  },
  computed: {
    isCouponEnabled() {
      return false
    },
    isShownMoreButton() {
      return this.reservations.length > this.topPageReservationCount
    },
    topPageReservationCount() {
      // トップページでの表示数を変更する場合、下記の値を修正する
      return 3
    },
    hasReservations() {
      return this.reservations.length > 0
    },
    ...mapState('reservation', ['reservations'])
  }
}
</script>

<style scoped>
/* .flex.align-self-baseline div {
  font-size: 1.5em;
}
.mypage-top {
  width: 90%;
  margin: 0 auto;
}
.under {
  width: 80%;
}
@media screen and (max-width: 767px) {
  .mypage-top {
    width: 100%;
  }
  .under {
    width: 90%;
  }
} */
</style>
