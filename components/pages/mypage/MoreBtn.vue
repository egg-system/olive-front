<template>
  <v-layout>
    <v-flex class="text-center">
      <v-btn large class="font-weight-bold" color="warning" @click="more">
        履歴をもっと見る
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
