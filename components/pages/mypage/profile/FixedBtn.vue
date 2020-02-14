<template>
  <div>
    <v-layout>
      <v-flex class="text-center">
        <v-btn large class="font-weight-bold my-6" color="warning" @click="fix">
          入力内容を確定する
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-center">
        <v-btn class="font-weight-bold" @click="back">
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
      this.$router.push('/mypage/profile/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>
