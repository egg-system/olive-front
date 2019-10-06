<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <v-card-text class="message" v-html="errorMessage" />
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex xs6>
            <v-btn color="warning" href="https://olivebodycare.healthcare/">店舗ホームページへ</v-btn>
          </v-flex>
          <v-flex v-if="isLogin" xs6>
            <v-btn color="warning" @click="goMyPage">マイページへ</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn color="warning" @click="back">戻る</v-btn>
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
    // messageにobjectの文字列が勝手に入っている場合があるので考慮
    isIncludedObjectString() {
      return /({|})/.test(this.message)
    },
    errorMessage() {
      const statusCode = this.statusCode
      let _message = ''
      if (statusCode === 404) {
        // 404はerror.messageにデフォルトの文字列が入っている場合があるので先に返す
        _message += 'ページが見つかりません。'
      } else if (this.message && !this.isIncludedObjectString) {
        _message += this.message
      } else if (/5\d{2}/.test(statusCode)) {
        _message += 'ただいまサイトにアクセスできません。'
      }

      if (this.isShownDefaultErrorMessage) {
        _message +=
          '<br>OSのバージョンアップをしていただくか、\
          <a href="https://olivebodycare.healthcare/about/contact">こちら</a>\
          のお問い合わせフォームからご予約をお願いいたします。'
      }

      return _message
    },
    isShownDefaultErrorMessage() {
      return (
        !this.message || this.isIncludedObjectString || this.statusCode === 404
      )
    },
    ...mapGetters('login', ['isLogin'])
  },
  methods: {
    goHomePage() {
      this.$router.push('/')
    },
    goMyPage() {
      this.$router.push('/mypage')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.message {
  color: red;
  font-weight: bolder;
}
</style>
