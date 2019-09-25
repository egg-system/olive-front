<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <v-card-text class="message">{{ errorMessage }}<template v-if="isShownDefaultErrorMessage"><br>OSのバージョンアップをしていただくか、<a href="https://olivebodycare.healthcare/about/contact">こちら</a>のお問い合わせフォームからご予約をお願いいたします。</template>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex xs6>
            <v-btn color="warning" href="https://olivebodycare.healthcare/">店舗ホームページへ</v-btn>
          </v-flex>
          <v-flex v-if="isLogin" xs6>
            <v-btn color="warning" @click="goMyPage">マイページへ</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: 'エラー'
    }
  },
  computed: {
    statusCode() {
      return this.error && this.error.statusCode
    },
    message() {
      return this.error && this.error.message
    },
    errorMessage() {
      const statusCode = this.statusCode
      if (statusCode === 404) {
        // 404はerror.messageにデフォルトの値が入っている場合があるので先に返す
        return 'ページが見つかりません。'
      }

      if (this.message) {
        return this.message
      }

      let message = 'エラーです。'
      if (Math.floor(statusCode / 100) === 5) {
        message = 'ただいまサイトにアクセスできません。'
      }
      return message
    },
    isShownDefaultErrorMessage() {
      return !this.message || this.statusCode === 404
    },
    ...mapGetters('login', ['isLogin'])
  },
  methods: {
    goHomePage() {
      this.$router.push('/')
    },
    goMyPage() {
      this.$router.push('/mypage')
    }
  }
}
</script>

<style scoped>
.message {
  color: red;
  font-weight: bolder;
  white-space: pre-wrap;
}
</style>
