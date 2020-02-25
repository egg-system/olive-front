<template>
  <div class="text-center">
    <v-btn class="font-weight-bold" :disabled="!canClick" color="warning" @click="set">
      パスワードを登録する
    </v-btn>
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
