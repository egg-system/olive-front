<template>
  <div>
    <div>パスワードの更新が完了いたしました。</div>
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="login">ログイン</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'password',
  created() {
    this.updatePassword()
  },
  methods: {
    login() {
      this.$router.push('/mypage')
    },
    ...mapActions('login', ['updatePassword'])
  }
}
</script>
