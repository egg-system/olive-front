<template>
  <v-layout column>
    <v-flex xs6>
      <v-btn color="warning" @click="more">
        もっと見る
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    more() {
      this.$router.push({
        path: '/mypage/reservations',
        query: { page: 1 }
      })
    }
  }
}
</script>
