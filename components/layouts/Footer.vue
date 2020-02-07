<template>
  <v-footer>
    <v-layout>
      <v-flex text-center>
        &copy;{{ date }} — <strong>olivebodycare</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    date: new Date().getFullYear()
  })
}
</script>

<style scoped lang="scss">
</style>
