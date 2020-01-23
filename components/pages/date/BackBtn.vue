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
      this.$root.context.store.commit('reservation/select/reset')
      this.$router.push('/menus/', { shopId: this.$root.context.query.shopId })
    }
  }
}
</script>

<style scoped>
.btn-area {
  text-align: center;
}
</style>
