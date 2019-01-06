<template>
  <section class="container">
    <div>
      <h1>login</h1>
      <div class="text-xs-center">
        <nuxt-link to="/registration">
          新規登録
        </nuxt-link>
      </div>
      <div v-if="data.isLogin === true">
        <v-avatar>
          <img src="https://image.freepik.com/free-icon/no-translate-detected_318-10541.jpg">
        </v-avatar>
        {{ data.userName }}
        <div>
          <v-btn
            color="warning"
            @click="logout"
          >
            ログアウト
          </v-btn>
        </div>
      </div>
      <v-form v-if="data.isLogin === false" ref="form">
        <v-flex>
          <v-text-field
            v-model="userName"
            :rules="nameRules"
            label="user name"
            clearable
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="password"
            @click:append="show = !show"
          />
        </v-flex>
        <v-alert v-if="data.isError === true"
                 :value="true"
                 color="error"
                 icon="warning"
                 outline
        >
          user name or password is invalid
        </v-alert>
        <v-btn
          :disabled="!canLogin"
          color="success"
          @click="login">
          ログイン
        </v-btn>
      </v-form>
    </div>
  </section>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    show: false,
    isError: false,
    userName: '',
    password: '',
    nameRules: [
      v => !!v || 'user name is required',
      v =>
        (!!v && v.length <= 30) || 'user name must be less than 30 characters'
    ],
    passwordRules: [
      v => !!v || 'password is required',
      v => (!!v && v.length <= 30) || 'password must be less than 30 characters'
    ]
  }),
  computed: {
    canLogin() {
      return this.userName !== '' && this.password !== ''
    },
    ...mapState({ data: 'login' })
  },
  methods: {
    // ログインボタンを押した時の動き
    login() {
      // ログインチェック
      this.checkLogin({ userName: this.userName, password: this.password })

      // 画面遷移
      // this.$router.push('/registration')
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
