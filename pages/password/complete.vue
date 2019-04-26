<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex>
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="block">パスワードの再設定</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <div>
          ご登録のメールアドレス宛に、リセット用URLを記載したメールを送信しました。<br>
          そちらからパスワードのリセットをお願いいたします。
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
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {},
  methods: {
    login() {
      this.$router.push('/mypage/')
    }
  }
}
</script>

<style scoped>
.input {
  width: 90%;
  margin: 0 auto;
}
.block {
  text-align: left;
}
</style>
