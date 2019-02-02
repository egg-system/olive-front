<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name />
        <registration-menu :is-first="false"/>
        <registration-user-info />
        <login-info />
        <registration-confirm-info />
        <registration-request />
        <registration-confirm-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ShopName from '~/components/pages/common/ShopName.vue'
import LoginInfo from '~/components/pages/registration/LoginInfo.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'
import RegistrationConfirmBtn from '~/components/pages/common/RegistrationConfirmBtn.vue'

export default {
  components: {
    ShopName,
    LoginInfo,
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest,
    RegistrationConfirmBtn
  }
}
</script>

<style>
.v-card__text {
  padding: 7px;
}
</style>
