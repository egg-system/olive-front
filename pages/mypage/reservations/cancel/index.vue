<template>
  <div>
    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text>
          <h3 class="mypage-title">
            マイページトップ > 予約一覧 > 予約キャンセル確認
          </h3>
        </v-card-text>
      </v-card>
    </v-flex>

    <mypage-reserve-history　:force-hide-cancel="true" />

    <div class="message">
      予約をキャンセルします。よろしいですか？
    </div>
    <v-flex>
      <v-btn @click="back">
        戻る
      </v-btn>
      <v-btn color="warning" @click="complete">
        確定する
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
import MypageReserveHistory from '~/components/pages/mypage/reservations/ReserveHistory.vue'

export default {
  layout: 'mypage',
  components: {
    // vue/no-unused-components自体のバグ
    // https://github.com/vuejs/eslint-plugin-vue/issues/556#issuecomment-414697825
    /* eslint-disable vue/no-unused-components */
    MypageReserveHistory
  },
  async fetch({ store, query, error }) {
    try {
      await store.dispatch('reservation/getReservation', query.id)
    } catch (e) {
      error({
        statusCode: (e.response && e.response.status) || 500,
        message:
          'エラーが発生しました。お手数ですが、もう一度やり直してください。'
      })
    }

    const { reservations } = store.state.reservation
    if (!reservations.length) {
      error({
        statusCode: 400,
        message:
          'エラーが発生しました。お手数ですが、もう一度やりなおしてください。'
      })
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    complete() {
      this.$router.push({
        name: 'mypage-reservations-cancel-complete',
        query: { id: this.$route.query.id }
      })
    }
  }
}
</script>

<style>
.message {
  margin-top: 15px;
}
</style>
