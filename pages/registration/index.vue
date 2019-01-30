<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name />
        <menu />
        <user-info />
        <login-info />
        <confirm-info />
        <request />
        <confirm-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ShopName from '~/components/pages/common/ShopName.vue'
import UserInfo from '~/components/pages/common/UserInfo.vue'
import Menu from '~/components/pages/registration/Menu.vue'
import LoginInfo from '~/components/pages/registration/LoginInfo.vue'
import ConfirmInfo from '~/components/pages/registration/ConfirmInfo.vue'
import Request from '~/components/pages/registration/Request.vue'
import ConfirmBtn from '~/components/pages/registration/ConfirmBtn.vue'

export default {
  components: {
    ShopName,
    UserInfo,
    Menu,
    LoginInfo,
    ConfirmInfo,
    Request,
    ConfirmBtn
  }
}
</script>

<style>
.v-card__text {
  padding: 7px;
}
</style>
