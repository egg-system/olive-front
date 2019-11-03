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
      store.commit('user/setIsCreate', true)
      await store.dispatch('user/createCustomer')
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
