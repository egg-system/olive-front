<template>
  <div>
    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text>
          <h3 class="mypage-title">マイページトップ</h3>
        </v-card-text>
      </v-card>
    </v-flex>

    <template v-if="isCouponEnabled">
      <h3>
        <p class="under">残りの回数券（回数券をお持ちの方のみ)</p>
      </h3>
      <mypage-coupon/>
    </template>

    <h3>
      <p class="under">予約履歴</p>
    </h3>

    <template v-if="hasReservations">
      <mypage-reserve-history/>
      <mypage-more-btn/>

      <h3>
        <p class="under">予約キャンセル</p>
      </h3>
      <mypage-cancel-btn/>
    </template>

    <v-layout v-else justify-center column>
      <v-flex xs6>
        <div>予約履歴がございません。</div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageCoupon from '~/components/pages/mypage/Coupon.vue'
import MypageReserveHistory from '~/components/pages/mypage/reservations/ReserveHistory.vue'
import MypageMoreBtn from '~/components/pages/mypage/MoreBtn.vue'
import MypageCancelBtn from '~/components/pages/mypage/CancelBtn.vue'
import MypageName from '~/components/pages/mypage/Name.vue'
import { mapState } from 'vuex'

export default {
  layout: 'mypage',
  fetch({ store }) {
    store.dispatch('reservation/paginateReservations', 1)
  },
  components: {
    MypageHeader,
    MypageCoupon,
    MypageReserveHistory,
    MypageMoreBtn,
    MypageCancelBtn,
    MypageName
  },
  computed: {
    isCouponEnabled() {
      return false
    },
    hasReservations() {
      return this.reservations.length > 0
    },
    ...mapState('reservation', ['reservations'])
  }
}
</script>
