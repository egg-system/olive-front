<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">
          パスワードを登録する
        </v-btn>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import { mapState } from 'vuex'

import { checkPassword, checkSame } from '~/lib/validation'

export default {
  computed: {
    // TODO:registration/ConfirmBtnと共通化する
    canClick() {
      // 入力チェック
      if (this.login.password === '' || this.login.password2 === '') {
        return false
      }
      // バリデーションチェック
      if (
        checkPassword(this.login.password) !== true ||
        checkPassword(this.login.password2) !== true
      ) {
        return false
      }
      // 同一チェック
      if (checkSame(this.login.password, this.login.password2) !== true) {
        return false
      }
      return true
    },
    ...mapState({
      registration: state => state.registration,
      login: state => state.login
    })
  },
  methods: {
    confirm() {
      this.$router.push('/password/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
