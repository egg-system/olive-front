<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex class="create">
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="mypage-title">新規会員登録 > 完了</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <div>会員登録が完了しました</div>

        <v-layout column>
          <v-flex xs6>
            <v-btn @click="login">ログイン</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  async fetch({ store, error }) {
    try {
      // 会員登録させるため、isCreateをtrueにする
      store.commit('login/setIsCreate', true)
      await store.dispatch('login/createCustomer')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }

    const { login } = store.state
    if (login.isError) {
      const message = `${
        login.errorMessage
      }\nお手数ですが最初からやり直してください。`
      store.commit('login/reset')
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

<style scoped>
.create {
  text-align: left;
}
</style>
