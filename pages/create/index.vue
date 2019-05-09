<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex class="create">
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="mypage-title">新規会員登録</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <div class="input">
          <customer-name/>
          <customer-mail/>
          <customer-phone-number/>
          <customer-adress/>
          <customer-message/>
          <customer-password/>
          <confirm-btn/>
        </div>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import CustomerAdress from '~/components/pages/common/customer/Adress.vue'
import CustomerPassword from '~/components/pages/common/customer/Password.vue'
import ConfirmBtn from '~/components/pages/create/ConfirmBtn.vue'

export default {
  components: {
    CustomerName,
    CustomerMail,
    CustomerPhoneNumber,
    CustomerMessage,
    CustomerAdress,
    CustomerPassword,
    ConfirmBtn
  }
}
</script>

<style scoped>
.create {
  text-align: left;
}
.input {
  width: 90%;
  margin: 0 auto;
}
</style>
