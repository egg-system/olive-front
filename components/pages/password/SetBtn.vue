<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="set">
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
      if (this.user.password === '' || this.user.passwordConfirm === '') {
        return false
      }
      // バリデーションチェック
      if (
        checkPassword(this.user.password) !== true ||
        checkPassword(this.user.passwordConfirm) !== true
      ) {
        return false
      }
      // 同一チェック
      if (checkSame(this.user.password, this.user.passwordConfirm) !== true) {
        return false
      }
      return true
    },
    ...mapState({ user: state => state.user })
  },
  methods: {
    set() {
      this.$router.push('/password/complete')
    }
  }
}
</script>
