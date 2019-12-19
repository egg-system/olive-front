<template>
  <div>
    <div class="input">
      <h3 class="block">
        下記項目を入力して「次へ」でお進みください。
      </h3>
      <customer-mail />
      <customer-phone-number v-if="sholdCheckPhone" />
    </div>
    <v-flex>
      <reset-btn :should-check-phone="sholdCheckPhone" />
    </v-flex>
  </div>
</template>

<script>
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import ResetBtn from '~/components/pages/password/ResetBtn.vue'

export default {
  layout: 'password',
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

<style lang="scss" scoped>
.input {
  width: 90%;
  margin: 0 auto;
}
.container {
  min-height: auto !important;
}
.reset-btn {
  .v-btn__content {
    font-size: 1em;
  }
}
</style>
