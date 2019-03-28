<template>
  <v-layout column>
    <v-flex xs6>
      <div>キャンセルをご希望の方はこちらから</div>
      <v-btn color="error" @click="cancel">
        予約キャンセルへ
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$router.push('/mypage/')
    }
  }
}
</script>
