<template>
  <div>
    <mypage-header />
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex align-self-baseline>
          <div>山田　太郎　さん</div>
        </v-flex>

        <v-flex class="mypage-top">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">マイページトップ</h3></v-card-text>
          </v-card>
        </v-flex>

        <h3><p class="under">残りの回数券（回数券をお持ちの方のみ)</p></h3>
        <mypage-coupon />

        <h3><p class="under">予約履歴</p></h3>
        <mypage-reserve-history />

        <mypage-more-btn />

        <h3><p class="under">予約キャンセル</p></h3>
        <mypage-cancel-btn />

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageCoupon from '~/components/pages/mypage/Coupon.vue'
import MypageReserveHistory from '~/components/pages/mypage/ReserveHistory.vue'
import MypageMoreBtn from '~/components/pages/mypage/MoreBtn.vue'
import MypageCancelBtn from '~/components/pages/mypage/CancelBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader,
    MypageCoupon,
    MypageReserveHistory,
    MypageMoreBtn,
    MypageCancelBtn
  },
  data: () => ({
    link: '/mypage/top'
  }),
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    resisterBtn() {
      // 会員登録あり
      this.setIsCreate(true)
      this.$router.push('/registration')
    },
    ...mapMutations('login', ['setIsCreate'])
  }
}
</script>

<style>
.mypage-top {
  text-align: left;
}
.mypage-title {
  color: white;
}
.under {
  background: linear-gradient(transparent 90%, #ff99ab 70%);
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
