<template>
  <div>
    <v-layout v-if="readOnly">
      <v-flex>
        メールアドレス
      </v-flex>
      <v-flex>
        {{ mail }}
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex>
        メールアドレス
        <span>
          <v-chip label x-small color="error">必須</v-chip>
        </span>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex class="mt-2" xs10>
        <v-text-field
          v-model="mail"
          :rules="mailRules"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          type="text"
          solo
          label="メールアドレス"
          placeholder="例）info@olivebodycare.jp"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex v-if="!isConfirm" class="text-center body-2 mb-4">
        ＜確認の為再度メールアドレスを入力してください＞
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex v-if="!isConfirm" xs10>
        <v-text-field
          v-model="mailConfirm"
          :rules="mailRules"
          clearable
          type="text"
          solo
          label="メールアドレス"
          placeholder="例）info@olivebodycare.jp"
        />
      </v-flex>
    </v-layout>
    <v-alert v-if="!checkSame"
             :value="true"
             color="error"
             icon="warning"
             outlined
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
