<template>
  <div>
    <v-layout column>
      <v-flex class="text-center mt-8">
        <v-btn class="font-weight-bold" color="warning" href="https://olivebodycare.healthcare/">
          店舗ホームページはこちら
        </v-btn>
      </v-flex>
      <v-flex class="text-center mt-8">
        <v-btn class="font-weight-bold" color="warning" @click="goReserve">
          続けて予約する方はこちら
        </v-btn>
      </v-flex>
      <v-flex class="text-center mt-8">
        <v-btn class="font-weight-bold" color="warning" @click="goMyPage">
          マイページはこちら
        </v-btn>
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
      this.$router.push('/menus')
    },
    goMyPage() {
      this.$router.push('/mypage')
    }
  }
}
</script>
