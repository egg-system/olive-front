<template>
  <div>

    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧 > 予約キャンセル完了</h3></v-card-text>
      </v-card>
    </v-flex>

    <template v-if="result">
      <div>予約をキャンセルしました。</div>
      <div>予約キャンセルメールをお送りしましたので、ご確認ください。</div>
    </template>

    <template v-else>
      <div>エラーが発生しました。お手数ですが、もう一度やり直してください。</div>
    </template>

    <v-flex>
      <v-btn color="warning" @click="top">マイページトップへ</v-btn>
    </v-flex>

  </div>
</template>

<script>
export default {
  layout: 'mypage',
  async asyncData({ store, query }) {
    const result = await store.dispatch(
      'reservation/destroyReservation',
      query.id
    )

    return { result }
  },
  methods: {
    top() {
      this.$router.push('/mypage')
    }
  }
}
</script>
