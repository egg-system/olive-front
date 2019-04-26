<template>
  <div class="userinfo">

    <v-layout row>
      <v-flex xs3>パスワード<span class="must">(必須)</span></v-flex>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            label="パスワード"
            class="input-password"
            @click:append="show = !show"
          />
        </v-flex>
        <v-flex>確認のため、再度パスワードを入力してください</v-flex>
        <v-flex>
          <v-text-field
            v-model="password2"
            :rules="passwordRules"
            :append-icon="show2 ? 'visibility_off' : 'visibility'"
            :type="show2 ? 'text' : 'password'"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            label="パスワード"
            class="input-password"
            @click:append="show2 = !show2"
          />
        </v-flex>
      </v-layout>
    </v-layout>
    <v-alert v-if="!checkSame"
             :value="true"
             color="error"
             icon="warning"
             outline
    >
      同じパスワードを入力してください
    </v-alert>
  </div>

</template>

<script>
import { checkPassword, checkSame } from '~/lib/validation'
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    show: false,
    show2: false,
    passwordRules: [password => checkPassword(password)]
  }),
  computed: {
    checkSame() {
      return checkSame(this.password, this.password2)
    },
    password: {
      get() {
        return this.login.password
      },
      set(value) {
        this.setPassword(value)
      }
    },
    password2: {
      get() {
        return this.login.password2
      },
      set(value) {
        this.setPassword2(value)
      }
    },
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    ...mapMutations('login', ['setPassword', 'setPassword2'])
  }
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
