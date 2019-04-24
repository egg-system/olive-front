<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn color="warning" href="https://olivebodycare.jp/">店舗ホームページへ</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn color="warning" @click="goReserve">続けて予約する方へ</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn color="warning" @click="goMyPage">マイページへ</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    goHomePage() {
      this.$router.push('/')
    },
    goReserve() {
      this.$router.push('/menu')
    },
    goMyPage() {
      this.$router.push('/mypage/top')
    }
  }
}
</script>

<style>
</style>
