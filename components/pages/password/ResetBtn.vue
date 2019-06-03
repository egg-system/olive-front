<template>
  <div>
    <v-layout column class="reset-btns-section">
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" class="reset-btn" @click="confirm">
          パスワードをリセットする
        </v-btn>
      </v-flex>
      <v-flex xs6 class="reset-back-btn-wrapper">
        <v-btn @click="back">戻る</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { checkMail, checkPhoneNumber, checkSame } from '~/lib/validation'

export default {
  props: {
    shouldCheckPhone: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // TODO:registration/ConfirmBtnと共通化する
    canClick() {
      // 入力チェック
      if (
        this.login.mail === '' ||
        this.login.mail2 === '' ||
        (this.shouldCheckPhone && this.login.phoneNumber === '')
      ) {
        return false
      }
      // バリデーションチェック
      if (
        checkMail(this.login.mail) !== true ||
        checkMail(this.login.mail2) !== true ||
        (this.shouldCheckPhone &&
          checkPhoneNumber(this.login.phoneNumber) !== true)
      ) {
        return false
      }
      // 同一チェック
      if (checkSame(this.login.mail, this.login.mail2) !== true) {
        return false
      }
      return true
    },
    ...mapState({ login: state => state.login })
  },
  methods: {
    confirm() {
      this.$router.push('/password/mail')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>
