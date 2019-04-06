<template>
  <div>
    <mypage-header />
    <section class="container">
      <v-container grid-list-xl>
        <v-layout column>
          <mypage-name />

          <v-flex class="mypage-top">
            <v-card dark color="red lighten-2">
              <v-card-text><h3 class="mypage-title">マイページトップ > 会員情報変更</h3></v-card-text>
            </v-card>
          </v-flex>

          <h3><p class="under">会員情報変更</p></h3>
          <div class="pr">
            <customer-name />
            <customer-mail />
            <customer-phone-number />
            <customer-adress />
            <customer-message />
            <confirm-btn />
          </div>

        </v-layout>
      </v-container>

    </section>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageReserveHistory from '~/components/pages/mypage/ReserveHistory.vue'
import MypageListPagination from '~/components/pages/mypage/ListPagination.vue'
import MypageName from '~/components/pages/mypage/Name.vue'
import CustomerName from '~/components/pages/common/customer/Name.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import CustomerMessage from '~/components/pages/common/customer/Message.vue'
import CustomerAdress from '~/components/pages/common/customer/Adress.vue'
import ConfirmBtn from '~/components/pages/mypage/profile/ConfirmBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader,
    MypageReserveHistory,
    MypageListPagination,
    MypageName,
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
      login: state => state.login
    })
  }
}
</script>

<style>
.mypage-top {
  text-align: left;
}
.mypage-title {
  color: white;
}
.pr {
  width: 90%;
  margin: 0 auto;
}
.under {
  background: linear-gradient(transparent 90%, #ff99ab 70%);
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
