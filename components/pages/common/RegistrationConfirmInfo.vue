<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>サロンからお客様への確認事項</h3>
          </v-card-text>
        </v-card>
        <v-layout>
          <v-flex>
            ご来店に際しての注意事項
            <p class="mt-3">
              ・ご予約確定後の前日・当日キャンセル・無断キャンセルについては、キャンセル料金を頂戴いたします（前日3,100円、当日6,200円）。予めご了承ください。
            </p>
            <p>
              ・ご予約のご変更、キャンセルをご希望の際はご予約日２日前までにマイページからキャンセル処理をするか当院にご連絡ください。
            </p>
            <p>
              ・当院は法令およびプライバシーポリシーを厳守しております。しつこい営業や勧誘のメールをお届けすることは一切ありません。
            </p>
            <p>
              ・
              <a href="https://olivebodycare.healthcare/reserve/agreement/">ご予約に関する規約がございます。</a>確認の上、予約処理を実行して下さい。
            </p>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex class="okBtn">
            <span>
              <v-chip label x-small class="mt-6 error">必須</v-chip>
            </span>
            <v-checkbox
              v-model="isOk"
              :disabled="isConfirm"
              label="確認し、同意します。"
              value="ok"
            />
          </v-flex>
        </v-layout>
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

<style lang="scss" scoped>
.okBtn {
  display: flex;
  justify-content: center;
}
</style>
