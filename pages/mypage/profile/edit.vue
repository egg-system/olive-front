<template>
  <div>
    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text>
          <h3 class="mypage-title">マイページトップ > 会員情報変更</h3>
        </v-card-text>
      </v-card>
    </v-flex>

    <h3>
      <p class="under">会員情報変更</p>
    </h3>
    <div class="pr">
      <customer-mail :is-label="true"/>
      <customer-name/>
      <customer-phone-number/>
      <customer-message/>
      <confirm-btn/>
    </div>
  </div>
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
    ConfirmBtn
  },
  data: () => ({}),
  computed: {
    ...mapState({
      login: state => state.login
    })
  }
}
</script>

<style>
.pr {
  width: 90%;
  margin: 0 auto;
}
</style>
