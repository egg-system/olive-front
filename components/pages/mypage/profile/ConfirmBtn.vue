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
        this.user.mailConfirm === '' ||
        this.user.phoneNumber === ''
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
        checkMail(this.user.mailConfirm) !== true ||
        checkPhoneNumber(this.user.phoneNumber) !== true
      ) {
        return false
      }
      // 同一チェック
      if (checkSame(this.user.mail, this.user.mailConfirm) !== true) {
        return false
      }
      return true
    },
    ...mapState({ user: state => state.user })
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
