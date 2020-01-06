<template>
  <div class="userinfo">
    <v-layout row>
      <v-flex xs3>
        サロンからのメッセージ受信設定
      </v-flex>
      <v-flex>
        <v-radio-group v-model="message" :disabled="isConfirm" :mandatory="false" class="inputTop">
          <v-radio label="受け取る" value="yes" />
          <v-radio label="受け取らない" value="no" />
        </v-radio-group>
      </v-flex>
    </v-layout>
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

<style>
.userinfo {
  padding-top: 20px;
  text-align: left;
}
.must {
  color: red;
}
.inputTop {
  margin-top: 1px;
}
</style>
