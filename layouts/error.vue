<template>
  <div class="container">
    <div v-html="errorMessage"/>
    <br>
    <div>
      <nuxt-link to="/">ホーム</nuxt-link>に戻る。
    </div>
  </div>
</template>

<script>
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
      return (this.error && this.error.statusCode) || 500
    },
    errorMessage() {
      const statusCode = this.statusCode
      let message = `エラーです。<br>OSのバージョンアップをしていただくか、
        <a href="https://olivebodycare.healthcare/about/contact">こちら</a>
        のお問い合わせフォームからご予約をお願いいたします。`
      if (statusCode === 404) {
        message = 'ページが見つかりません。'
      } else if (Math.floor(statusCode / 100) === 5) {
        message = `ただいまサイトにアクセスできません。<br>
          時間を置いて再度アクセスしてください。`
      }
      return message
    }
  }
}
</script>
<style scoped>
.container {
  flex-direction: column;
}
</style>
