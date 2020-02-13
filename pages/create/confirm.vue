<template>
  <section class="container">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mt-4">
            <h3>
              新規登録 > 確認
            </h3>
          </v-card-text>
        </v-card>

        <customer-name :is-confirm="true" />
        <customer-mail :is-confirm="true" />
        <customer-phone-number :is-confirm="true" />
        <customer-adress v-if="false" :is-confirm="true" />
        <customer-message :is-confirm="true" />
        <customer-password :is-confirm="true" />
        <fixed-btn />
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import CustomerAdress from '~/components/pages/common/customer/Adress.vue'
import CustomerPassword from '~/components/pages/common/customer/Password.vue'
import FixedBtn from '~/components/pages/create/FixedBtn.vue'

export default {
  components: {
    CustomerName,
    CustomerMail,
    CustomerPhoneNumber,
    CustomerMessage,
    CustomerAdress,
    CustomerPassword,
    FixedBtn
  }
}
</script>
