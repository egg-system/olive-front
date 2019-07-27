<template>
  <div class="btn-area">
    <v-layout column>
      <v-flex xs6 class="back-btn-warapper">
        <v-btn class="back-btn" @click="back">
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
      this.$router.push({ name: 'menus' })
    }
  }
}
</script>

<style>
.btn-area {
  text-align: center;
}
</style>
