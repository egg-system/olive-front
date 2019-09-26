<template>
  <div>
    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text>
          <h3 class="mypage-title">マイページトップ > 会員情報変更完了</h3>
        </v-card-text>
      </v-card>
    </v-flex>

    <div>会員情報の変更が完了しました</div>
    <v-btn color="warning" @click="goMypageTop">マイページトップへ</v-btn>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  async fetch({ store, error }) {
    try {
      await store.dispatch('login/updateCustomer')

      const { login } = store.state
      if (login.isError) {
        const message =
          login.errorMessage + '\nお手数ですが最初からやり直してください。'
        store.commit('login/reset')
        error({ statusCode: 400, message })
      }
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
  },
  methods: {
    goMypageTop() {
      this.$router.push('/mypage')
    }
  }
}
</script>
