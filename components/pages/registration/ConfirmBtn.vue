<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">
          予約内容を確認する
        </v-btn>
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

export default {
  computed: {
    canClick() {
      // ログイン済みの場合、okのみチェック
      if (this.isLogin) {
        return this.reservation.isOk
      }

      if (this.reservation.isOk === null) {
        return false
      }

      // 新規登録の場合
      if (this.user.isCreate && !this.validCreateInput) {
        return false
      }

      return this.validRegistrationInput
    },
    ...mapState({
      reservation: state => state.reservation,
      user: state => state.user
    }),
    ...mapGetters('user', [
      'isLogin',
      'validRegistrationInput',
      'validCreateInput'
    ])
  },
  methods: {
    confirm() {
      this.$router.push({ path: '/confirm', query: this.$root.context.query })
    },
    back() {
      this.resetReservation()
      if (this.isLogin) {
        this.$router.push({ path: '/date', query: this.$root.context.query })
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
