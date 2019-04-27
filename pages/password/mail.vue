<template>
  <div>
    <div>
      ご登録のメールアドレス宛に、リセット用URLを記載したメールを送信しました。<br>
      そちらからパスワードのリセットをお願いいたします。
    </div>
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="top">マイページトップに戻る</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'password',
  created() {
    // TODO:パスワードリセットAPIの実行
    // 入力情報のリセット
    this.resetPasswordInfo()
  },
  methods: {
    top() {
      this.$router.push('/mypage/')
    },
    ...mapMutations('login', ['resetPasswordInfo'])
  }
}
</script>
