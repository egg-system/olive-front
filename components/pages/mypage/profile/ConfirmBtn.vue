<template>
  <div>

    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">
          確認画面へ
        </v-btn>
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
    // TODO:registration/ConfirmBtnと共通化する
    canClick() {
      // 入力チェック
      if (
        this.login.firstName === '' ||
        this.login.lastName === '' ||
        this.login.firstNameKana === '' ||
        this.login.lastNameKana === '' ||
        this.login.mail === '' ||
        this.login.mail2 === '' ||
        this.login.phoneNumber === ''
      ) {
        return false
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
      if (checkSame(this.login.mail, this.login.mail2) !== true) {
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
      this.$router.push('/mypage/profile/confirm')
    }
  }
}
</script>

<style>
</style>
