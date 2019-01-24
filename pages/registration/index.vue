<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex align-self-baseline>
          <div>オリーヴボディーケア　◯◯店</div>
        </v-flex>
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
import Menu from './Menu.vue'
import UserInfo from './UserInfo.vue'
import LoginInfo from './LoginInfo.vue'
import ConfirmInfo from './ConfirmInfo.vue'
import Request from './Request.vue'
import ConfirmBtn from './ConfirmBtn.vue'

export default {
  components: {
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
