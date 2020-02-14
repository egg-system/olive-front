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
              マイページトップ > 登録情報変更
            </h3>
          </v-card-text>
        </v-card>

        <h3>
          登録情報変更
        </h3>
        <hr color="#ef9a9a" class="mb-4">
        <customer-mail :read-only="true" />
        <customer-name />
        <customer-phone-number />
        <customer-adress v-if="false" />
        <customer-message />
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
import ConfirmBtn from '~/components/pages/mypage/profile/ConfirmBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'mypage',
  components: {
    CustomerName,
    CustomerMail,
    CustomerPhoneNumber,
    CustomerMessage,
    CustomerAdress,
    ConfirmBtn
  },
  data: () => ({}),
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
