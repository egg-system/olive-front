<template>
  <v-flex align-self-baseline>
    <div>{{ store.name }}</div>
  </v-flex>
</template>

<script>
export default {
  computed: {
    store() {
      return this.$store.state.store
    }
  }
}
</script>
