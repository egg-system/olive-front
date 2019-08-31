<template>
  <div>

    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧 > 予約キャンセル確認</h3></v-card-text>
      </v-card>
    </v-flex>

    <template v-if="isShownHisroty">
      <mypage-reserve-history　:force-hide-cancel="true" />

      <div class="message">予約をキャンセルします。よろしいですか？</div>
      <v-flex>
        <v-btn @click="back">戻る</v-btn>
        <v-btn color="warning" @click="complete">確定する</v-btn>
      </v-flex>
    </template>
    <template v-else>
      <v-layout justify-center column>
        <v-flex xs6>
          <div>エラーが発生しました。お手数ですが、もう一度やりなおしてください。</div>
        </v-flex>
      </v-layout>
      <v-flex>
        <v-btn @click="back">戻る</v-btn>
      </v-flex>
    </template>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import MypageReserveHistory from '~/components/pages/mypage/reservations/ReserveHistory.vue'

export default {
  layout: 'mypage',
  fetch({ store, query }) {
    store.dispatch('reservation/getReservation', query.id)
  },
  components: {
    MypageReserveHistory
  },
  computed: {
    isShownHisroty() {
      return this.reservations.length > 0
    },
    ...mapState('reservation', ['reservations'])
  },
  methods: {
    complete() {
      this.$router.push({
        name: 'mypage-reservations-cancel-complete',
        query: { id: this.$route.query.id }
      })
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.message {
  margin-top: 15px;
}
</style>
