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
        @click="login">
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
    ...mapState({ data: 'login' })
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
          // 画面遷移
          console.log(this.link)
          // this.$router.push('/registration')
          this.$router.push(this.link)
        }
      })
    },
    logoutBtn() {
      // フォームの値をクリアする
      this.mail = ''
      this.password = ''
      this.logout()
    },
    ...mapActions({
      checkLogin: 'login/checkLogin'
    }),
    ...mapMutations({
      logout: 'login/logout'
    })
  }
}
</script>

<style>
@media screen and (min-width: 350px) {
  .inputText {
    width: 340px;
  }
}
@media screen and (min-width: 500px) {
  .inputText {
    width: 450px;
  }
}
</style>
