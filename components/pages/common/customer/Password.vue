<template>
  <div>
    <v-layout>
      <v-flex>
        パスワード
        <span>
          <v-chip label x-small color="error">必須</v-chip>
        </span>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10 class="mt-2">
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :append-icon="show ? 'visibility_off' : 'visibility'"
          :type="show ? 'text' : 'password'"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          solo
          counter
          label="パスワード（英字/数字を含む8文字以上）"
          placeholder="英字/数字を含む8文字以上"
          @click:append="show = !show"
        />
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex class="body-2 mb-4" text-center>
        ＜確認の為再度パスワードを入力してください＞
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs10>
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordRules"
          :append-icon="show2 ? 'visibility_off' : 'visibility'"
          :type="show2 ? 'text' : 'password'"
          :disabled="isConfirm"
          :clearable="!isConfirm"
          solo
          counter
          label="パスワード（英字/数字を含む8文字以上）"
          placeholder="英字/数字を含む8文字以上"
          @click:append="show2 = !show2"
        />
      </v-flex>
    </v-layout>
    <v-alert v-if="!checkSame"
             :value="true"
             color="error"
             icon="warning"
             outlined
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
      return checkSame(this.password, this.passwordConfirm)
    },
    password: {
      get() {
        return this.user.password
      },
      set(value) {
        this.setPassword(value)
      }
    },
    passwordConfirm: {
      get() {
        return this.user.passwordConfirm
      },
      set(value) {
        this.setPasswordConfirm(value)
      }
    },
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapMutations('user', ['setPassword', 'setPasswordConfirm'])
  }
}
</script>
