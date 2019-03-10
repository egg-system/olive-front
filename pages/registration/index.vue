<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name />
        <registration-menu />
        <registration-user-info />
        <login-info v-if="!this.$store.state.login.isLogin && this.$store.state.login.isCreate" />
        <registration-confirm-info />
        <registration-request />
        <confirm-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ShopName from '~/components/pages/common/ShopName.vue'
import LoginInfo from '~/components/pages/registration/LoginInfo.vue'
import ConfirmBtn from '~/components/pages/registration/ConfirmBtn.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'

export default {
  components: {
    ShopName,
    LoginInfo,
    ConfirmBtn,
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest
  }
}
</script>

<style>
.v-card__text {
  padding: 7px;
}
</style>
