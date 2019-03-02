<template>
  <div class="reserve-btn-area">
    <v-layout column>
      <v-flex xs6>
        <v-btn color="warning" @click="next">
          予約する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
export default {
  methods: {
    next() {
      this.$router.push({ name: 'date' })
    }
  }
}
</script>

<style>
.reserve-btn-area {
  text-align: center;
}
</style>
