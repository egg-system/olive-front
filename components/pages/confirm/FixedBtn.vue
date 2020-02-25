<template>
  <div>
    <v-layout>
      <v-flex class="text-center">
        <v-btn large class="font-weight-bold" :disabled="pushed" 
               color="warning"
               @click="fix"
        >
          上記に同意の上予約を確定する
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-center mt-6">
        <v-btn class="font-weight-bold" @click="back">
          入力内容を変更する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pushed: false
    }
  },
  methods: {
    fix() {
      this.pushed = true
      this.$router.push('/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>
