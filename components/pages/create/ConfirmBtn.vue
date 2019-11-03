<template>
  <div>

    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="confirm">
          確認画面へ
        </v-btn>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    canClick() {
      return this.validCreateInput
    },
    ...mapGetters('user', ['validCreateInput'])
  },
  methods: {
    confirm() {
      this.$router.push('/create/confirm')
    }
  }
}
</script>

<style>
</style>
