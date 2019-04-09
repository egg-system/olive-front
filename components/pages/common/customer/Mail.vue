<template>
  <div class="userinfo">

    <v-layout row>
      <v-flex xs3>メールアドレス<span class="must">(必須)</span></v-flex>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="mail"
            :rules="mailRules"
            :disabled="isConfirm"
            :clearable="!isConfirm"
            type="text"
            label="メールアドレス"
          />
        </v-flex>
        <v-flex v-if="!isConfirm">確認のため、再度メールアドレスを入力してください</v-flex>
        <v-flex v-if="!isConfirm">
          <v-text-field
            v-model="mail2"
            :rules="mailRules"
            clearable
            type="text"
            label="メールアドレス"
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
      同じメールアドレスを入力してください
    </v-alert>

  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import { checkMail, checkSame } from '~/lib/validation'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    mailRules: [mail => checkMail(mail)]
  }),
  computed: {
    mail: {
      get() {
        return this.$store.state.login.mail
      },
      set(value) {
        this.setMail(value)
      }
    },
    mail2: {
      get() {
        return this.$store.state.login.mail2
      },
      set(value) {
        this.setMail2(value)
      }
    },
    checkSame() {
      return checkSame(
        this.$store.state.login.mail,
        this.$store.state.login.mail2
      )
    }
  },
  methods: {
    ...mapMutations('login', ['setMail', 'setMail2'])
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
