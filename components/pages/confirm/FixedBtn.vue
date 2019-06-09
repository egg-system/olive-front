<template>
  <div>

    <v-layout column>
      <v-flex xs6>
        <v-btn color="warning" @click="fix">
          上記に同意の上予約を確定する
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
      this.$router.push('/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.v-btn__content {
  font-size: 1em;
  font-weight: normal;
}
</style>
