<template>
  <div>
    <div class="input">
      <h3 class="block">下記項目を入力して「次へ」でお進みください。</h3>
      <customer-mail />
      <customer-phone-number />
    </div>
    <v-flex>
      <reset-btn />
    </v-flex>
  </div>
</template>

<script>
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import ResetBtn from '~/components/pages/password/reset/ResetBtn.vue'

export default {
  layout: 'password',
  components: {
    CustomerMail,
    CustomerPhoneNumber,
    ResetBtn
  }
}
</script>

<style scoped>
.input {
  width: 90%;
  margin: 0 auto;
}
</style>
