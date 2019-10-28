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
        this.user.firstName === '' ||
        this.user.lastName === '' ||
        this.user.firstNameKana === '' ||
        this.user.lastNameKana === '' ||
        this.user.mail === '' ||
        this.user.mail2 === '' ||
        this.user.phoneNumber === '' ||
        this.user.password === '' ||
        this.user.password2 === ''
      ) {
        return false
      }
      // バリデーションチェック
      if (
        checkName(this.user.firstName) !== true ||
        checkName(this.user.lastName) !== true ||
        checkNameKana(this.user.firstNameKana) !== true ||
        checkNameKana(this.user.lastNameKana) !== true ||
        checkMail(this.user.mail) !== true ||
        checkMail(this.user.mail2) !== true ||
        checkPhoneNumber(this.user.phoneNumber) !== true ||
        checkPassword(this.user.password) !== true ||
        checkPassword(this.user.password2) !== true
      ) {
        return false
      }
      // 同一チェック
      if (
        checkSame(this.user.mail, this.user.mail2) !== true ||
        checkSame(this.user.password, this.user.password2) !== true
      ) {
        return false
      }
      return true
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    confirm() {
      this.$router.push('/create/confirm')
    }
  }
}
</script>

<style>
</style>
