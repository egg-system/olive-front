<template>
  <v-app>
    <div>
      <Header />
      <nuxt/>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    Footer,
    Header
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
h2 {
  background: #f4cccd;
  display: block;
  font-size: 18px;
  padding: 5px 15px;
  text-align: left;
}
</style>
