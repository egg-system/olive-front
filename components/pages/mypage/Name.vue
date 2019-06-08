<template>
  <v-flex align-self-baseline>
    <div class="txt_15em">{{ custmerFullName }} さん</div>
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

<style>
.txt_15em {
  font-size: 1.5em;
}
</style>
