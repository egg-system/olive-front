<template>
  <div>
    <v-layout column class="reset-btns-section">
      <v-flex xs6>
        <v-btn :disabled="!canClick" color="warning" class="reset-btn" @click="confirm">
          パスワードをリセットする
        </v-btn>
      </v-flex>
      <v-flex xs6 class="reset-back-btn-wrapper">
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

<style scoped lang="scss">
.reset-btns-section {
  .reset-btn {
    .v-btn__content {
      font-size: 1em;
    }
  }
}
</style>
