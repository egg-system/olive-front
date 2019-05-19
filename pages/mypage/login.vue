<template>
  <section class="container">
    <loading v-if="login.isLoading" class="loading"/>
    <v-layout column>
      <v-flex>
        <v-card dark color="red lighten-2" class="head">
          <v-card-text><h3>ログイン</h3></v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <div :class="{ hidden: login.isLoading }" class="main" >
          <div>
            <h2 class="subtitle">会員の方はこちら</h2>
            <login-form :link="link" />
            <nuxt-link to="/password/reset">
              パスワードを忘れた方はこちら
            </nuxt-link>
          </div>

          <div class="not">
            <h2 class="subtitle">会員でない方はこちら</h2>
            <div>
              <v-btn color="warning" @click="createBtn">
                新規会員登録へ
              </v-btn>
            </div>
            <div class="free">※会員登録は無料です。</div>

          </div>
        </div>
      </v-flex>

    </v-layout>
  </section>
</template>

<script>
import LoginForm from '~/components/pages/login/Form.vue'
import Loading from '~/components/layouts/Loading.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  middleware: ['is-logged-in'],
  components: {
    LoginForm,
    Loading
  },
  data: () => ({
    link: '/mypage/'
  }),
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    createBtn() {
      // this.setIsCreate(true)
      this.$router.push('/create')
    },
    ...mapMutations('login', ['setIsCreate'])
  }
}
</script>

<style scoped>
@import '~/assets/login.css';
</style>
