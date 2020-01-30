<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <!-- エラーメッセージは、システムで作成するため、XSSの危険性は低い -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <v-card-text class="message" v-html="errorMessage" />
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex xs6>
            <v-btn color="warning" href="https://olivebodycare.healthcare/">
              店舗ホームページへ
            </v-btn>
          </v-flex>
          <v-flex v-if="isLogin" xs6>
            <v-btn color="warning" @click="goMyPage">
              マイページへ
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn color="warning" @click="back">
              戻る
            </v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      default: null
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
      const _message = this.getBaseErrorMessage()

      if (!this.isShownDefaultErrorMessage) return _message

      return `${_message}\
        <br>OSのバージョンアップをしていただくか、\
        <a href="https://olivebodycare.healthcare/about/contact">メールフォーム</a>\
        からご予約をお願いいたします。`
    },
    isShownDefaultErrorMessage() {
      return (
        !this.message || this.isIncludedObjectString || this.statusCode === 404
      )
    },
    ...mapGetters('user', ['isLogin'])
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
    },
    getBaseErrorMessage() {
      const statusCode = this.statusCode
      if (statusCode === 404) {
        // 404はerror.messageにデフォルトの文字列が入っている場合があるので先に返す
        return 'ページが見つかりません。'
      } else if (this.message && !this.isIncludedObjectString) {
        return this.message
      }
      return 'エラーが発生しました。'
    },
    ...mapActions('reservation', ['resetAllInputed'])
  },
  created() {
    this.resetAllInputed()
  },
  head() {
    return {
      title: 'エラー'
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
