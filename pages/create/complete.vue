<template>
  <v-container class="min-height">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center">
            <h3>
              新規登録 > 完了
            </h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <p class="text-center mt-8">
      登録が完了しました。
    </p>

    <v-layout>
      <v-flex class="text-center mt-4">
        <v-btn large class="font-weight-bold" @click="login">
          ログインはこちら
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch({ store, error }) {
    try {
      // 新規登録させるため、isCreateをtrueにする
      store.commit('user/setIsCreate', true)
      await store.dispatch('user/createCustomer')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }

    const { errorMessage } = store.state.user
    const isError = store.getters['user/isError']
    if (isError) {
      const message = `
        ${errorMessage}
        <br>お手数ですが最初からやり直してください。
        <br>※ 新規登録をせずに
        <a href="https://olivebodycare.healthcare/about/contact/">
          メールフォーム
        </a>
        からご予約いただくことも可能です。
      `
      store.commit('user/reset')
      error({ statusCode: 400, message })
    }
  },
  methods: {
    login() {
      this.$router.push('/mypage/login')
    }
  }
}
</script>
