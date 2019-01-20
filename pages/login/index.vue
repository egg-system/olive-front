<template>
  <section class="container">
    <div>
      <div>
        <h2>会員の方はログインしてください</h2>
        <Form />
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
import Form from './Form.vue'

export default {
  components: {
    Form
  },
  methods: {
    resisterBtn() {
      this.$router.push('/registration')
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
