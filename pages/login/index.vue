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
            <h2 class="subtitle">2回目以降の方はこちら</h2>
            <login-form :link="link" :query="query" />
            <nuxt-link v-if="!user.errorMessage" to="/password/reset">
              パスワードを忘れた方はこちら
            </nuxt-link>
          </div>

          <div class="not">
            <h2 class="subtitle">はじめましての方はこちら</h2>
            <div>
              <v-btn color="warning" @click="resisterBtn">新規登録して、予約する</v-btn>
            </div>
          </div>
          <div class="free">
            ※ 新規登録をせずに<a href="https://olivebodycare.healthcare/about/contact/">こちら</a>からご予約いただくことも可能です。
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
      this.setIsCreate(true)
      this.$router.push({ path: '/registration', query: this.query })
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
