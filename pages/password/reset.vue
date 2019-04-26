<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex>
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="block">パスワードの再設定</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <div class="input">
          <h3 class="block">下記項目を入力して「次へ」でお進みください。</h3>
          <customer-mail />
          <customer-phone-number />
        </div>

        <v-flex>
          <confirm-btn />
        </v-flex>

      </v-layout>

    </v-container>
  </section>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import CustomerMail from '~/components/pages/common/customer/Mail.vue'
import CustomerPhoneNumber from '~/components/pages/common/customer/PhoneNumber.vue'
import ConfirmBtn from '~/components/pages/password/reset/ConfirmBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader,
    CustomerMail,
    CustomerPhoneNumber,
    ConfirmBtn
  }
}
</script>

<style scoped>
.input {
  width: 90%;
  margin: 0 auto;
}
.block {
  text-align: left;
}
</style>
