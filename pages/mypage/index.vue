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
      <mypage-reserve-history :limit="topPageReservationCount"/>
      <mypage-more-btn v-if="isShownMoreButton" />

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
  middleware: ['fetch-reservations'],
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
.flex.align-self-baseline div {
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
}
</style>
