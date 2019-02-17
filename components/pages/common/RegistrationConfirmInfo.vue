<template>
  <div class="confirmInfo">

    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>サロンからお客様への確認事項</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout column>
      <v-flex xs3>ご来店に際しての注意事項<span class="must">(必須)</span></v-flex>
      <v-flex xs3>・ご予約確定後の前日・当日キャンセル・無断キャンセルについては、キャンセル料金を頂戴いたします（前日3,240円、当日6,480円）。予めご了承ください。</v-flex>
      <v-flex xs3>・ご予約のご変更、キャンセルをご希望の際はご予約日２日前までにWebキャンセル処理をするか当院にご連絡ください。</v-flex>
      <v-flex xs3>・仮予約等での複数の予約取得行為は禁止とさせて頂きます。そのご予約は無効となる場合がございます。</v-flex>
      <v-flex xs3>・当院は法令およびプライバシーポリシーを厳守しております。しつこい営業や勧誘のメールをお届けすることは一切ありません。<nuxt-link to="/">プライバシーポリシー</nuxt-link>の内容をご確認ください。</v-flex>
      <v-flex>
        <v-checkbox :disabled="isConfirm"
                    v-model="isOk"
                    class="okBtn"
                    label="確認し、同意します"
                    value="ok" />
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    password: '',
    passwordRules: [v => !!v || '必須入力です']
  }),
  computed: {
    isOk: {
      get() {
        return this.$store.state.registration.isOk
      },
      set(value) {
        this.setIsOk(value)
      }
    }
  },
  methods: {
    ...mapMutations('registration', ['setIsOk'])
  }
}
</script>

<style>
.confirmInfo {
  padding-top: 20px;
  text-align: left;
}
.okBtn {
  justify-content: center;
}
</style>
