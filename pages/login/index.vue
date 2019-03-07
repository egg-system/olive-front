<template>
  <section class="container">
    <loading v-if="this.$store.state.login.isLoading" class="loading"/>
    <div :class="{ hidden: this.$store.state.login.isLoading }" class="main" >
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
    </div>
  </section>
</template>


<script>
import LoginForm from '~/components/pages/login/Form.vue'
import Loading from '~/components/layouts/Loading.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    LoginForm,
    Loading
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

<style>
.not {
  padding-top: 50px;
}
.v-btn {
  width: 200px;
}
.container {
  position: relative;
  z-index: 1;
}
.main {
  z-index: 2;
}
.loading {
  position: absolute;
  z-index: 3;
}
.hidden {
  opacity: 0.3;
}
</style>
