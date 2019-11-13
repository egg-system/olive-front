<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex class="create">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">新規登録 > 確認</h3></v-card-text>
          </v-card>
        </v-flex>

        <div class="input">
          <customer-name :is-confirm="true"/>
          <customer-mail :is-confirm="true"/>
          <customer-phone-number :is-confirm="true"/>
          <customer-adress v-if="false" :is-confirm="true"/>
          <customer-message :is-confirm="true"/>
          <customer-password :is-confirm="true"/>
          <fixed-btn />
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

<style scoped>
.create {
  text-align: left;
}
.input {
  width: 90%;
  margin: 0 auto;
}
</style>
