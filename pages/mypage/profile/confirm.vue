<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 md10
                lg8
                xl6
        >
          <v-card dark color="red lighten-2">
            <v-card-text class="white--text text-center mb-4">
              <h3>
                マイページトップ > 登録情報変更確認
              </h3>
            </v-card-text>
          </v-card>

          <h3>
            登録情報変更
          </h3>
          <hr color="#ef9a9a" class="mb-4">
          <customer-mail :read-only="true" />
          <customer-name :is-confirm="true" />
          <customer-phone-number :is-confirm="true" />
          <customer-adress v-if="false" :is-confirm="true" />
          <customer-message :is-confirm="true" />
          <fixed-btn />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import CustomerAdress from '~/components/pages/common/customer/Adress.vue'
import FixedBtn from '~/components/pages/mypage/profile/FixedBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'mypage',
  components: {
    CustomerName,
    CustomerMail,
    CustomerPhoneNumber,
    CustomerMessage,
    CustomerAdress,
    FixedBtn
  },
  data: () => ({}),
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>
