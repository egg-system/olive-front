<template>
  <div>
    <div class="mt-2">
      サロンからのメッセージ受信設定
    </div>
    <div class="receive">
      <v-radio-group v-model="message" :disabled="isConfirm" :mandatory="false" row>
        <v-radio label="受け取る" value="yes" />
        <v-radio label="受け取らない" value="no" />
      </v-radio-group>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    message: {
      get() {
        return this.$store.state.reservation.message
      },
      set(value) {
        this.setMessage(value)
      }
    }
  },
  methods: {
    ...mapMutations('reservation', ['setMessage'])
  }
}
</script>

<style lang="scss" scoped>
.receive {
  display: flex;
  justify-content: center;
}
</style>
