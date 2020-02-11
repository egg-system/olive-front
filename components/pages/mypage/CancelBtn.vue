<template>
  <v-layout>
    <v-flex class="text-center">
      <p>キャンセルをご希望の方はこちらから</p>
      <v-btn large class="font-weight-bold" color="error" @click="cancel">
        予約キャンセルはこちら
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$router.push({
        path: '/mypage/reservations',
        query: { page: 1, cancel: true }
      })
    }
  }
}
</script>
