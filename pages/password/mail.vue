<template>
  <div>
    <div>
      ご登録のメールアドレス宛に、リセット用URLを記載したメールを送信しました。
      <br>そちらからパスワードのリセットをお願いいたします。
    </div>
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="top">
          マイページトップに戻る
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  layout: 'password',
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
