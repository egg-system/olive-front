<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex class="create">
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="mypage-title">新規会員登録 > 完了</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <template v-if="isError">
          <div>{{ errorMessage }}お手数ですが、最初からやり直してください。</div>
        </template>
        <template v-else>
          <div>会員登録が完了しました</div>
        </template>

        <v-layout column>
          <v-flex xs6>
            <v-btn v-if="isError" @click="back">戻る</v-btn>
            <v-btn v-else @click="login">ログイン</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('login', ['isError', 'errorMessage'])
  },
  created() {
    // 会員登録させるため、isCreateをtrueにする
    this.setIsCreate(true)
    this.createCustomer()
    this.resetCustomerInfo()
  },
  methods: {
    login() {
      this.$router.push('/mypage')
    },
    back() {
      this.reset()
      this.$router.push('/create')
    },
    ...mapActions('login', ['createCustomer']),
    ...mapMutations('login', ['setIsCreate', 'reset', 'resetCustomerInfo'])
  }
}
</script>

<style scoped>
.create {
  text-align: left;
}
</style>
