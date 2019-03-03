<template>
  <div class="btn-area">
    <v-layout column>
      <v-flex xs6>
        <v-btn @click="back">
          もどる
        </v-btn>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.btn-area {
  text-align: center;
}
</style>
