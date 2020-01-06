<template>
  <v-layout row wrap>
    <v-form ref="form" class="inputText">
      <v-text-field
        v-model="mail"
        :rules="mailRules"
        type="text"
        label="メールアドレス"
        clearable
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :append-icon="show ? 'visibility_off' : 'visibility'"
        :type="show ? 'text' : 'password'"
        label="パスワード"
        @click:append="show = !show"
      />
      <v-alert v-if="data.isError"
               :value="true"
               color="error"
               icon="warning"
               outline
      >
        メールアドレスもしくはパスワードが違います。
      </v-alert>
      <v-btn
        :disabled="!canLogin"
        color="success"
        @click="login"
      >
        ログイン
      </v-btn>
    </v-form>
  </v-layout>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { checkMail, checkPassword } from '~/lib/validation'

export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    query: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    show: false,
    isError: false,
    mail: '',
    password: '',
    mailRules: [mail => checkMail(mail)],
    passwordRules: [password => checkPassword(password)]
  }),
  computed: {
    canLogin() {
      return (
        checkMail(this.mail) === true && checkPassword(this.password) === true
      )
    },
    ...mapState({ data: 'user' })
  },
  methods: {
    // ログインボタンを押した時の動き
    login() {
      // ログインチェック
      this.checkLogin({
        mail: this.mail,
        password: this.password
      }).then(isLogin => {
        if (isLogin) {
          this.$router.push({ path: this.link, query: this.query })
        }
      })
    },
    ...mapActions({
      checkLogin: 'user/checkLogin'
    })
  }
}
</script>

<style>
.inputText {
  width: 100%;
}
</style>
