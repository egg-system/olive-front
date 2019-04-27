<template>
  <section class="container">
    <loading v-if="login.isLoading" class="loading"/>
    <div :class="{ hidden: login.isLoading }" class="main">
      <div>
        <h2>会員の方はログインしてください</h2>
        <login-form :link="link"/>
        <nuxt-link to="/password/reset">パスワードを忘れた方はこちら</nuxt-link>
      </div>

      <div class="not">
        <h4>ログインIDをお持ちでない方はこちらから</h4>
        <div>
          <v-btn color="warning" @click="resisterBtn">新規会員登録へ</v-btn>
          <v-btn color="warning" @click="skipBtn">会員登録せずに予約へ進む</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '~/components/pages/login/Form.vue'
import Loading from '~/components/layouts/Loading.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    LoginForm,
    Loading
  },
  data: () => ({
    link: '/registration'
  }),
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    resisterBtn() {
      // 会員登録あり
      this.setIsCreate(true)
      this.$router.push('/registration')
    },
    skipBtn() {
      // 会員登録なし
      this.setIsCreate(false)
      this.$router.push('/registration')
    },
    ...mapMutations('login', ['setIsCreate'])
  }
}
</script>
