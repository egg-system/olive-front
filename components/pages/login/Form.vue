<template>
  <v-layout row wrap>
    <v-form ref="form" class="inputText">
      <v-text-field
        v-model="mail"
        :rules="nameRules"
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

export default {
  data: () => ({
    show: false,
    isError: false,
    mail: '',
    password: '',
    nameRules: [
      v => !!v || 'メールアドレスは必須入力です',
      v =>
        (!!v && v.length <= 100) || 'メールアドレスは100文字以内でお願いします'
    ],
    passwordRules: [
      v => {
        if (!v) {
          return 'パスワードは必須入力です'
        }
        const regex = new RegExp(
          /^([a-z\d\.\*\+\^\|\[\]\(\)\?\$\{\}\-\"\'\`_<>~!=#@$%&]){8,100}$/i
        )
        if (!regex.exec(v)) {
          return '英字/数字/記号の8文字以上100文字以内でお願いします'
        }
        return true
      }
    ]
  }),
  computed: {
    canLogin() {
      return this.mail !== '' && this.password !== ''
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
          this.$router.push('/registration')
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
