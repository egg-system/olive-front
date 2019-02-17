<template>
  <div class="loginInfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>会員ログイン情報</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs3>パスワード<span class="must">(必須)</span></v-flex>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="パスワード"
            clearable
            class="input-password"
            @click:append="show = !show"
          />
        </v-flex>
        <v-flex>確認のため、再度パスワードを入力してください</v-flex>
        <v-flex>
          <v-text-field
            v-model="password2"
            :rules="passwordRules2"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            label="パスワード"
            clearable
            class="input-password"
            @click:append="show = !show"
          />
        </v-flex>
      </v-layout>
    </v-layout>

  </div>

</template>

<script>
export default {
  data: () => ({
    show: false,
    password: '',
    password2: '',
    passwordRules: [v => !!v || '必須入力です'],
    passwordRules2: [v => !!v || '必須入力です']
  })
}
</script>

<style>
.loginInfo {
  padding-top: 20px;
  text-align: left;
}
.input-password {
  width: 95%;
}
</style>
