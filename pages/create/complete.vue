<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex class="create">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">新規会員登録  > 完了</h3></v-card-text>
          </v-card>
        </v-flex>

        <div>
          会員登録が完了しました
        </div>
        <v-layout column>
          <v-flex xs6>
            <v-btn @click="login">ログイン</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created() {
    // TODO:ユーザー作成APIの実行
    // 入力情報のリセット
    this.resetCustomerInfo()
  },
  methods: {
    login() {
      this.$router.push('/mypage/')
    },
    ...mapMutations('login', ['resetCustomerInfo'])
  }
}
</script>

<style scoped>
.create {
  text-align: left;
}
</style>
