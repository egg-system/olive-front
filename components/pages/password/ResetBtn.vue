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
        this.user.mail === '' ||
        this.user.mail2 === '' ||
        (this.shouldCheckPhone && this.user.phoneNumber === '')
      ) {
        return false
      }
      // バリデーションチェック
      if (
        checkMail(this.user.mail) !== true ||
        checkMail(this.user.mail2) !== true ||
        (this.shouldCheckPhone &&
          checkPhoneNumber(this.user.phoneNumber) !== true)
      ) {
        return false
      }
      // 同一チェック
      if (checkSame(this.user.mail, this.user.mail2) !== true) {
        return false
      }
      return true
    },
    ...mapState({ user: state => state.user })
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

<style lang="scss">
.reset-btns-section {
  .reset-btn {
    .v-btn__content {
      font-size: 1em;
    }
  }
}
</style>
