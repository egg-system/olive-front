<template>
  <div>
    <div>
      ご登録のメールアドレス宛に、リセット用URLを記載したメールを送信しました。<br>
      そちらからパスワードのリセットをお願いいたします。
    </div>
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="login">ログイン</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'password',
  created() {
    // TODO:パスワード変更APIの実行
    // 入力情報のリセット
    this.resetPasswordInfo()
  },
  methods: {
    login() {
      this.$router.push('/mypage/')
    },
    ...mapMutations('login', ['resetPasswordInfo'])
  }
}
</script>
