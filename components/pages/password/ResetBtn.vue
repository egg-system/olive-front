<template>
  <div>
    <v-layout column>
      <v-flex class="text-center">
        <v-btn :disabled="!canClick" color="warning" class="font-weight-bold" @click="confirm">
          パスワードをリセットする
        </v-btn>
      </v-flex>
      <v-flex class="text-center mt-6">
        <v-btn @click="back">
          戻る
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { checkPhoneNumber } from '~/lib/validation'

export default {
  props: {
    shouldCheckPhone: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    canClick() {
      if (!this.validMailInput) {
        return false
      }
      if (
        this.shouldCheckPhone &&
        checkPhoneNumber(this.phoneNumber) !== true
      ) {
        return false
      }
      return true
    },
    ...mapState('user', ['phoneNumber']),
    ...mapGetters('user', ['validMailInput'])
  },
  methods: {
    confirm() {
      this.$router.push('/password/mail')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>
