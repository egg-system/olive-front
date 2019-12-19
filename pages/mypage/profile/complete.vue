<template>
  <div>
    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text>
          <h3 class="mypage-title">
            マイページトップ > 会員情報変更完了
          </h3>
        </v-card-text>
      </v-card>
    </v-flex>

    <div>会員情報の変更が完了しました</div>
    <v-btn color="warning" @click="goMypageTop">
      マイページトップへ
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  async fetch({ store, error }) {
    try {
      await store.dispatch('user/updateCustomer')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }

    const { errorMessage } = store.state.user
    const isError = store.getters['user/isError']
    if (isError) {
      const message = `${errorMessage}<br>お手数ですが最初からやり直してください。`
      store.commit('user/reset')
      error({ statusCode: 400, message })
    }
  },
  methods: {
    goMypageTop() {
      this.$router.push('/mypage')
    }
  }
}
</script>
