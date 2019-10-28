<template>
  <section id="login" class="container">
    <loading v-if="user.isLoading" class="loading"/>
    <v-layout column>
      <v-flex>
        <v-card dark color="red lighten-2" class="head">
          <v-card-text><h3>ログイン</h3></v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <div :class="{ hidden: user.isLoading }" class="main">
          <div>
            <h2 class="subtitle">会員の方はこちら</h2>
            <login-form :link="link" :query="query" />
            <nuxt-link to="/password/reset">
              パスワードを忘れた方はこちら
            </nuxt-link>
          </div>

          <div class="not">
            <h2 class="subtitle">会員でない方はこちら</h2>
            <div>
              <v-btn color="warning" @click="resisterBtn">新規会員登録をして予約する</v-btn>
              <v-btn color="warning" @click="skipBtn">会員登録せずに予約へ進む</v-btn>
            </div>
            <div class="free">
              ※会員登録は無料です。<br>
              ※会員登録をしていただくと、マイページからご予約履歴をいつでも確認できて、キャンセル等の手続きも簡単に行えるようになります。
            </div>
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
  middleware: ['init-shop-id'],
  components: {
    LoginForm,
    Loading
  },
  asyncData({ query }) {
    return {
      link: '/registration',
      query: { shopId: query.shopId }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
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
    ...mapMutations('user', ['setIsCreate'])
  }
}
</script>

<style lang="scss">
@import '~/assets/login.css';

#login {
  button {
    &.warning {
      .v-btn__content {
        font-size: 1em;
      }
    }
  }
}
</style>
