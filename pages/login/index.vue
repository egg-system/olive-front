<template>
  <section id="login" class="container">
    <loading v-if="user.isLoading" class="loading" />
    <v-layout column>
      <v-flex>
        <v-card dark color="red lighten-2" class="head">
          <v-card-text><h3>ログイン</h3></v-card-text>
        </v-card>
      </v-flex>

      <v-flex>
        <div :class="{ hidden: user.isLoading }" class="main">
          <div>
            <h2 class="subtitle">
              2回目以降の方はこちら
            </h2>
            <login-form :link="link" :query="query" />
            <nuxt-link to="/password/reset">
              パスワードを忘れた方はこちら
            </nuxt-link>
          </div>

          <div class="not">
            <h2 class="subtitle">
              初めての方はこちら
            </h2>
            <div>
              <v-btn color="warning" @click="resisterBtn">
                新規登録して、予約する
              </v-btn>
            </div>
          </div>
          <div class="free">
            ※ 会員登録は無料です。<br>	
            ※ 会員登録をしていただくと、マイページからご予約履歴をいつでも確認できて、キャンセル等の手続きも簡単に行えるようになります。<br>
            ※ 新規登録をせずに<a href="https://olivebodycare.healthcare/about/contact/">メールフォーム</a>からご予約いただくことも可能です。
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
      query: query
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
      this.$router.push({ path: '/registration', query: this.query })
    },
    skipBtn() {
      // 会員登録なし
      this.setIsCreate(false)
      this.$router.push({ path: '/registration', query: this.query })
    },
    ...mapMutations('user', ['setIsCreate'])
  }
}
</script>

<style scoped lang="scss">
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
