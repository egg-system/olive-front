<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">予約内容を確認する</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
      // ログイン済みの場合、okのみチェック
      if (this.login.isLogin) {
        return this.registration.isOk
      }

      // 入力チェック
      if (this.isEmptyRequiredInput || this.registration.isOk === null) {
        return false
      }

      // 新規会員登録の場合
      if (this.login.isCreate) {
        // パスワードは必須入力
        if (this.login.password === '' || this.login.password2 === '') {
          return false
        }
        // 同一チェック
        if (checkSame(this.login.password, this.login.password2) !== true) {
          return false
        }
      }

      // バリデーションチェック
      if (
        checkName(this.login.firstName) !== true ||
        checkName(this.login.lastName) !== true ||
        checkNameKana(this.login.firstNameKana) !== true ||
        checkNameKana(this.login.lastNameKana) !== true ||
        checkMail(this.login.mail) !== true ||
        checkMail(this.login.mail2) !== true ||
        checkPhoneNumber(this.login.phoneNumber) !== true
      ) {
        return false
      }

      // 同一チェック
      return !checkSame(this.login.mail, this.login.mail2)
    },
    isEmptyRequiredInput() {
      return (
        this.login.firstName === '' ||
        this.login.lastName === '' ||
        this.login.firstNameKana === '' ||
        this.login.lastNameKana === '' ||
        this.login.mail === '' ||
        this.login.mail2 === '' ||
        this.login.phoneNumber === ''
      )
    },
    ...mapState({
      registration: state => state.registration,
      login: state => state.login
    })
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
