<template>
  <div class="userinfo">
    <v-layout v-if="readOnly" row>
      <v-flex xs3>
        メールアドレス
      </v-flex>
      <v-flex>
        {{ mail }}
      </v-flex>
    </v-layout>
    <v-layout v-else row>
      <v-flex xs3>
        メールアドレス<span class="must">(必須)</span>
      </v-flex>
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
        <v-flex v-if="!isConfirm">
          確認のため、再度メールアドレスを入力してください
        </v-flex>
        <v-flex v-if="!isConfirm">
          <v-text-field
            v-model="mailConfirm"
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
    readOnly: {
      type: Boolean,
      default: false
    },
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
        return this.$store.state.user.mail
      },
      set(value) {
        this.setMail(value)
      }
    },
    mailConfirm: {
      get() {
        return this.$store.state.user.mailConfirm
      },
      set(value) {
        this.setMailConfirm(value)
      }
    },
    checkSame() {
      return checkSame(
        this.$store.state.user.mail,
        this.$store.state.user.mailConfirm
      )
    }
  },
  methods: {
    ...mapMutations('user', ['setMail', 'setMailConfirm'])
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
