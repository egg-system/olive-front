<template>
  <v-container class="min-height">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>
              パスワードの再設定
            </h3>
          </v-card-text>
        </v-card>

        <h3 class="mb-4">
          メールアドレスを入力して「パスワードをリセットする」でお進みください。
        </h3>
        <customer-mail />
        <customer-phone-number v-if="sholdCheckPhone" />
        <reset-btn :should-check-phone="sholdCheckPhone" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import ResetBtn from '~/components/pages/password/ResetBtn.vue'

export default {
  components: {
    CustomerMail,
    CustomerPhoneNumber,
    ResetBtn
  },
  computed: {
    sholdCheckPhone() {
      // bk側が電話番号チェックを実装できていないので、false
      return false
    }
  }
}
</script>
