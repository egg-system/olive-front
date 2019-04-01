<template>
  <v-layout align-start justify-end row fill-height>
    <v-btn color="primary" dark class="mybtn" @click="top">
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn color="primary" dark class="mybtn" @click="profile">
      <v-icon>people</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  methods: {
    top() {
      this.$router.push('/mypage/top')
    },
    profile() {
      this.$router.push('/mypage/profile')
    }
  }
}
</script>

<style>
.mybtn {
  width: 10px;
}
</style>
