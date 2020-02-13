<template>
  <v-layout>
    <v-flex class="text-center">
      <v-btn arge class="font-weight-bold mb-6" :disabled="!canClick"
             color="warning"
             @click="confirm"
      >
        確認画面へ
      </v-btn>
    </v-flex>
  </v-layout>
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
