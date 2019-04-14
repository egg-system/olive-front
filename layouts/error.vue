<template>
  <div class="container">
    <div v-if="statusCode === 404">ページが見つかりません。</div>
    <div v-else>{{ message }}</div>
    <nuxt-link to="/">ホーム</nuxt-link>に戻る。
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
    message() {
      return this.error.message || 'エラーが発生しました。'
    }
  }
}
</script>
