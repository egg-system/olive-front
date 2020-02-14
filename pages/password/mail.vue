<template>
  <v-container class="min-height">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>
              パスワードの再設定
            </h3>
          </v-card-text>
        </v-card>

        <div class="text-center mt-6">
          <p>
            ご登録のメールアドレス宛に、リセット用URLを記載したメールを送信しました。
          </p>
          <p>
            そちらからパスワードのリセットをお願いいたします。
          </p>
          <v-btn class="font-weight-bold" color="warning" @click="top">
            マイページトップに戻る
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async fetch({ store, error }) {
    try {
      await store.dispatch('user/sendPasswrodResetMail')
    } catch (e) {
      error({
        statusCode: (e.response && e.response.status) || 500,
        message: e.message || ''
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
