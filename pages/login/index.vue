<template>
  <section class="container">
    <div>
      <div>
        <h2>会員の方はログインしてください</h2>
        <login-form />
        <nuxt-link to="/registration">
          パスワードを忘れた方はこちら
        </nuxt-link>
      </div>

      <div class="not">
        <h4>ログインIDをお持ちでない方はこちらから</h4>
        <div>
          <v-btn color="warning" @click="resisterBtn">
            新規会員登録へ
          </v-btn>
          <v-btn color="warning" @click="skipBtn">
            会員登録せずに予約へ進む
          </v-btn>
        </div>

      </div>
  </div></section>
</template>


<script>
import LoginForm from '~/components/pages/login/Form.vue'

export default {
  components: {
    LoginForm
  },
  methods: {
    resisterBtn() {
      // this.$router.push('/registration')
      // this.$router.push('https://olivebodycare.jp/web-reservation/email/')
      window.location = 'https://olivebodycare.jp/web-reservation/email/'
    },
    skipBtn() {
      this.$router.push('/registration')
    }
  }
}
</script>

<style>
.not {
  padding-top: 50px;
}
.v-btn {
  width: 200px;
}
</style>
