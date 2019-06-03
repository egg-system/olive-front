<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name/>
        <registration-menu/>
        <registration-user-info/>
        <login-info v-if="isShownLoginInfo"/>
        <registration-confirm-info/>
        <registration-request/>
        <confirm-btn/>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import LoginInfo from '~/components/pages/registration/LoginInfo.vue'
import ConfirmBtn from '~/components/pages/registration/ConfirmBtn.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'

export default {
  middleware: ['menu-selected', 'date-time-selected'],
  components: {
    ShopName,
    LoginInfo,
    ConfirmBtn,
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest
  },
  computed: {
    isShownLoginInfo() {
      return !this.isLogin && this.isCreate
    },
    ...mapState('login', ['isCreate']),
    ...mapGetters('login', ['isLogin'])
  }
}
</script>

<style scoped>
.v-card__text {
  padding: 7px;
}
.confirmInfo .layout.column.wrap + .layout.column div:nth-of-type(n + 2) {
  text-align: left !important;
}
/* 
パパ修正待ち
div[data-v-f42b7a1c].flex.xs6 {
  position: initial !important;
} 
*/
</style>
