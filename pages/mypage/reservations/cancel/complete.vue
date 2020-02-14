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
              マイページトップ > 予約一覧 > 予約キャンセル完了
            </h3>
          </v-card-text>
        </v-card>

        <div class="text-center">
          <p>予約をキャンセルしました。</p>
          <p>予約キャンセルメールをお送りしましたので、ご確認ください。</p>
          <v-btn class="font-weight-bold" color="warning" @click="top">
            マイページトップへ
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'mypage',
  async fetch({ store, query, error }) {
    try {
      await store.dispatch('reservation/destroyReservation', query.id)
    } catch (e) {
      error({
        statusCode: (e.response && e.response.status) || 500,
        message:
          'エラーが発生しました。お手数ですが、もう一度やり直してください。'
      })
    }
  },
  methods: {
    top() {
      this.$router.push('/mypage')
    }
  }
}
</script>
