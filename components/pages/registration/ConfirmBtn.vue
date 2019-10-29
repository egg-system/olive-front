<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">予約内容を確認する</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="back">
          もどる
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

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
      if (this.isLogin) {
        return this.reservation.isOk
      }

      // 入力チェック
      if (this.isEmptyRequiredInput || this.reservation.isOk === null) {
        return false
      }

      // 新規会員登録の場合
      if (this.user.isCreate) {
        // パスワードは必須入力
        if (this.user.password === '' || this.user.password2 === '') {
          return false
        }
        // 同一チェック
        if (checkSame(this.user.password, this.user.password2) !== true) {
          return false
        }
      }

      // バリデーションチェック
      if (
        checkName(this.user.firstName) !== true ||
        checkName(this.user.lastName) !== true ||
        checkNameKana(this.user.firstNameKana) !== true ||
        checkNameKana(this.user.lastNameKana) !== true ||
        checkMail(this.user.mail) !== true ||
        checkMail(this.user.mailConfirm) !== true ||
        checkPhoneNumber(this.user.phoneNumber) !== true
      ) {
        return false
      }

      // 同一チェック
      return checkSame(this.user.mail, this.user.mailConfirm)
    },
    isEmptyRequiredInput() {
      return (
        this.user.firstName === '' ||
        this.user.lastName === '' ||
        this.user.firstNameKana === '' ||
        this.user.lastNameKana === '' ||
        this.user.mail === '' ||
        this.user.mailConfirm === '' ||
        this.user.phoneNumber === ''
      )
    },
    ...mapState({
      reservation: state => state.reservation,
      user: state => state.user
    }),
    ...mapGetters('user', ['isLogin'])
  },
  methods: {
    confirm() {
      this.$router.push('/confirm')
    },
    back() {
      this.resetReservation()
      if (this.isLogin) {
        this.$router.push({ name: 'date' })
      } else {
        this.resetLogin()
        this.$router.go(-1)
      }
    },
    ...mapMutations('user', { resetLogin: 'reset' }),
    ...mapMutations('reservation', { resetReservation: 'reset' })
  }
}
</script>

<style>
</style>
