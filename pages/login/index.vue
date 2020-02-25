<template>
  <v-container class="min-height">
    <loading v-if="user.isLoading" class="loading" />
    <v-layout justify-center>
      <v-flex xs12 sm8 md7
              lg6
              xl4
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mt-6">
            <h3>ログイン</h3>
          </v-card-text>
        </v-card>
    
        <div :class="{ hidden: user.isLoading }">
          <div>
            <h2 class="text-center mt-6 mb-2">
              2回目以降の方はこちら
            </h2>
            <hr color="#ef9a9a">
            <login-form :link="link" :query="query" />
            <nuxt-link to="/password/reset">
              <p class="text-center mt-2">
                パスワードを忘れた方はこちら
              </p>
            </nuxt-link>
          </div>

          <div class="text-center">
            <h2 class="mt-8 mb-2">
              初めての方はこちら
            </h2>
            <hr color="#ef9a9a">
            <div class="mt-6">
              <v-btn class="font-weight-bold" large color="warning" @click="resisterBtn">
                新規登録して、予約する
              </v-btn>
            </div>
          </div>
          <div class="mt-6 text-center">
            <p>※ 登録は無料です。</p>
            <p>※ 登録をしていただくと、マイページからご予約履歴をいつでも確認できて、キャンセル等の手続きも簡単に行えるようになります。</p>
            <p>※ 新規登録をせずに<a href="https://olivebodycare.healthcare/about/contact/">メールフォーム</a>からご予約いただくことも可能です。</p>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
