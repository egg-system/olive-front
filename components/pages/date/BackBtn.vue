<template>
  <div>
    <v-layout>
      <v-flex class="text-center mt-6">
        <v-btn class="font-weight-bold" large @click="back">
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

<style scoped lang="scss">
</style>
