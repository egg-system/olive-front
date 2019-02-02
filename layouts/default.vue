<template>
  <v-app>
    <div>
      <app-header />
      <nuxt />
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppFooter from '~/components/layouts/Footer.vue'
import AppHeader from '~/components/layouts/Header.vue'

export default {
  components: {
    AppFooter,
    AppHeader
  }
}
</script>

<style>
/* 全ページ共通のcss */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
