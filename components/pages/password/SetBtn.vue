<template>
  <div>
    <v-layout column>
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" @click="set">
          パスワードを登録する
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
      return this.validPasswordInput
    },
    ...mapGetters('user', ['validPasswordInput'])
  },
  methods: {
    set() {
      this.$router.push('/password/complete')
    }
  }
}
</script>
