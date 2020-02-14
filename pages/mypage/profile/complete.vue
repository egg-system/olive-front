<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 md10
                lg8
                xl6
        >
          <v-card dark color="red lighten-2">
            <v-card-text class="white--text text-center my-6">
              <h3>
                マイページトップ > 登録情報変更完了
              </h3>
            </v-card-text>
          </v-card>

          <p class="text-center mt-6">
            登録情報の変更が完了しました。
          </p>
          <div class="text-center">
            <v-btn class="font-weight-bold" color="warning" @click="goMypageTop">
              マイページトップへ
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
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
