<template>
  <div>
    <div>パスワードの更新が完了いたしました。</div>
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="login">
          ログイン
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'password',
  async fetch({ store, error }) {
    try {
      await store.dispatch('user/updatePassword')
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }
  },
  methods: {
    login() {
      this.$router.push('/mypage')
    }
  }
}
</script>
