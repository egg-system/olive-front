<template>
  <div>
    <v-layout>
      <v-flex class="text-center">
        <v-btn large class="font-weight-bold my-4" :disabled="!canClick" 
               color="warning" 
               @click="confirm"
        >
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
      return this.validRegistrationInput
    },
    ...mapGetters('user', ['validRegistrationInput'])
  },
  methods: {
    confirm() {
      this.$router.push('/mypage/profile/confirm')
    }
  }
}
</script>
