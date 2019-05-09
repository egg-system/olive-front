<template>
  <v-flex align-self-baseline>
    <div>{{ custmerFullName }} さん</div>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', ['custmerFullName'])
  }
}
</script>
