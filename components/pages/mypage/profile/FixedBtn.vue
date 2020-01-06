<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn color="warning" @click="fix">
          入力内容を確定する
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="back">
          入力内容を変更する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    fix() {
      this.$router.push('/mypage/profile/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
