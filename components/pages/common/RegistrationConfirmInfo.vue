<template>
  <div class="confirmInfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text>
            <h3>サロンからお客様への確認事項</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout column>
      <v-flex xs3 class="txt_left">
        ご来店に際しての注意事項
        <span class="must">(必須)</span>
      </v-flex>
      <v-flex xs3 class="txt_left">
        ・ご予約確定後の前日・当日キャンセル・無断キャンセルについては、キャンセル料金を頂戴いたします（前日3,240円、当日6,480円）。予めご了承ください。
      </v-flex>
      <v-flex xs3 class="txt_left">
        ・ご予約のご変更、キャンセルをご希望の際はご予約日２日前までにマイページからキャンセル処理をするか当院にご連絡ください。
      </v-flex>
      <v-flex xs3 class="txt_left">
        ・当院は法令およびプライバシーポリシーを厳守しております。しつこい営業や勧誘のメールをお届けすることは一切ありません。
      </v-flex>
      <v-flex xs3 class="txt_left">
        ・
        <a href="https://olivebodycare.jp/web-reservation/agreement/">ご予約に関する規約がございます。</a>確認の上、予約処理を実行して下さい。
      </v-flex>
      <v-flex>
        <v-checkbox
          v-model="isOk"
          :disabled="isConfirm"
          class="okBtn"
          label="確認し、同意します"
          value="ok"
        />
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
        return this.$store.state.reservation.isOk
      },
      set(value) {
        this.setIsOk(value)
      }
    }
  },
  methods: {
    ...mapMutations('reservation', ['setIsOk'])
  }
}
</script>

<style scoped>
.confirmInfo {
  padding-top: 20px;
  text-align: left;
}
@media screen and (max-width: 767px) {
  .confirmInfo {
    width: 100%;
    margin: initial;
  }
}
.okBtn {
  justify-content: center;
}
.txt_left {
  text-align: left;
}
</style>
