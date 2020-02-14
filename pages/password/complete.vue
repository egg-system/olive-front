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

        <div class="text-center">
          <p class="mb-4">
            パスワードの更新が完了いたしました。
          </p>
          <v-btn class="font-weight-bold" color="warning" @click="login">
            ログイン
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
