<template>
  <div>

    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">
          予約内容を確認する
        </v-btn>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import {
  checkMail,
  checkPassword,
  checkName,
  checkNameKana,
  checkPhoneNumber,
  checkSame
} from '~/lib/validation'

export default {
  computed: {
    canClick() {
      // 入力チェック
      if (
        this.$store.state.login.firstName === '' ||
        this.$store.state.login.lastName === '' ||
        this.$store.state.login.firstNameKana === '' ||
        this.$store.state.login.lastNameKana === '' ||
        this.$store.state.login.mail === '' ||
        this.$store.state.login.mail2 === '' ||
        this.$store.state.login.phoneNumber === ''
      ) {
        return false
      }
      // バリデーションチェック
      if (
        checkName(this.$store.state.login.firstName) !== true ||
        checkName(this.$store.state.login.lastName) !== true ||
        checkNameKana(this.$store.state.login.firstNameKana) !== true ||
        checkNameKana(this.$store.state.login.lastNameKana) !== true ||
        checkMail(this.$store.state.login.mail) !== true ||
        checkMail(this.$store.state.login.mail2) !== true ||
        checkPhoneNumber(this.$store.state.login.phoneNumber) !== true
      ) {
        return false
      }
      // 同一チェック
      if (
        checkSame(
          this.$store.state.login.mail,
          this.$store.state.login.mail2
        ) !== true
      ) {
        return false
      }
      return true
    }
  },
  methods: {
    confirm() {
      this.$router.push('/confirm')
    }
  }
}
</script>

<style>
</style>
