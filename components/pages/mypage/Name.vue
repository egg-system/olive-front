<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <p class="headline">
          {{ custmerFullName }} さん
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['custmerFullName'])
  }
}
</script>
