<template>
  <section class="container">
    <div>
      <h1>login</h1>
      <div class="text-xs-center">
        <nuxt-link to="/registration">
          新規登録
        </nuxt-link>
      </div>
      <v-form ref="form">
        <v-flex>
          <v-text-field
            v-model="userName"
            label="user name"
            clearable
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="password"
            @click:append="show = !show"
          />
        </v-flex>
        <v-btn
          :disabled="!canLogin"
          @click="login">
          ログイン
        </v-btn>
      </v-form>
    </div>
  </section>
</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    show: false,
    userName: '',
    password: ''
  }),
  computed: {
    canLogin() {
      return this.userName !== '' && this.password !== ''
    }
  },
  mounted() {
    this.getLogin()
    console.log(this.$store)
  },
  methods: {
    login() {
      console.log(`userName:${this.userName}`)
      console.log(`password:${this.password}`)
      // 画面遷移
      // this.$router.push('/registration')
      console.log(this.$store.state.login.login)
    },
    ...mapActions({
      getLogin: 'login/getLogin'
    })
  }
}
</script>
