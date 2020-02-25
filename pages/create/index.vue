<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mt-4">
            <h3>
              新規登録
            </h3>
          </v-card-text>
        </v-card>

        <customer-name />
        <customer-mail />
        <customer-phone-number />
        <customer-adress v-if="enableAddress" />
        <customer-message />
        <customer-password />
        <confirm-btn />
      </v-flex>
    </v-layout>
  </v-container>
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
  },
  computed: {
    enableAddress() {
      return false
    }
  }
}
</script>
