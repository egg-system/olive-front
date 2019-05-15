<template>
  <v-layout align-start justify-end row fill-height>
    <v-btn color="primary" dark class="mybtn" @click="top">
      マイページ<br>トップ
    </v-btn>
    <v-btn color="primary" dark class="mybtn" @click="profile">
      登録情報
    </v-btn>
    <v-btn color="primary" dark class="mybtn" @click="logout">
      ログアウト
    </v-btn>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    top() {
      this.$router.push('/mypage/top')
    },
    profile() {
      this.$router.push('/mypage/profile/edit')
    },
    ...mapMutations('login', ['logout'])
  }
}
</script>

<style>
.mybtn {
  width: 40px;
  height: 50px;
  font-size: 12px;
  font-weight: bold;
}
</style>
