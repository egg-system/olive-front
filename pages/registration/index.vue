<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <ShopName />
        <Menu />
        <UserInfo />
        <LoginInfo />
        <ConfirmInfo />
        <Request />
        <ConfirmBtn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ShopName from '~/components/ShopName.vue'
import Menu from './Menu.vue'
import UserInfo from './UserInfo.vue'
import LoginInfo from './LoginInfo.vue'
import ConfirmInfo from './ConfirmInfo.vue'
import Request from './Request.vue'
import ConfirmBtn from './ConfirmBtn.vue'

export default {
  components: {
    ShopName,
    Menu,
    UserInfo,
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
