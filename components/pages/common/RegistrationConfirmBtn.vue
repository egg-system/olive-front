<template>
  <div>

    <v-layout column>
      <v-flex xs6>
        <v-btn color="warning" @click="confirm">
          予約内容を確認する
        </v-btn>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
export default {
  methods: {
    confirm() {
      this.$router.push('/confirm')
    }
  }
}
</script>

<style>
</style>
