<template>
  <v-container class="min-height" grid-list-lg>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>
              マイページトップ > 予約一覧 > 予約キャンセル確認
            </h3>
          </v-card-text>
        </v-card>

        <mypage-reserve-history　:force-hide-cancel="true" />
        
        <p class="text-center my-4">
          上記の予約をキャンセルします。よろしいですか？
        </p>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex class="text-center">
        <v-btn class="font-weight-bold" @click="back">
          戻る
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex class="text-center">
        <v-btn class="font-weight-bold" color="warning" @click="complete">
          確定する
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
