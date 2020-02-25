<template>
  <div>
    <v-layout>
      <v-flex class="text-center">
        <v-btn large class="font-weight-bold mt-2" color="warning" @click="fix">
          入力内容を確定する
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex large class="font-weight-bold text-center my-6">
        <v-btn @click="back">
          入力内容を変更する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  methods: {
    fix() {
      this.$router.push({
        path: '/create/complete',
        query: this.$root.context.query
      })
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>
