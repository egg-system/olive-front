<template>
  <v-footer fixed>
    <v-flex
      text-xs-center>
      &copy;{{ date }} — <strong>olive</strong>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    date: new Date().getFullYear()
  })
}
</script>
