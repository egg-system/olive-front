<template>
  <div class="container">
    <div v-if="statusCode === 404">ページが見つかりません。</div>
    <div v-else>
      エラーです。<br>OSのバージョンアップをしていただくか、<a href="https://olivebodycare.healthcare/about/contact">こちら</a>のお問い合わせフォームからご予約をお願いいたします。
    </div>
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
    }
  }
}
</script>
<style scoped>
.container {
  flex-direction: column;
}
</style>
