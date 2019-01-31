<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <div>
          <h1>confirm</h1>
          <div class="text-xs-center">
            <nuxt-link to="/complete">
              確定
            </nuxt-link>
            {{ this.$store.state.common.userInfo.firstName }}
          </div>
        </div>
        <shop-name />
        <registration-menu :is-first="true" />
        <registration-user-info />
        <registration-confirm-info />
        <registration-request />
        <registration-confirm-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ShopName from '~/components/pages/common/ShopName.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'
import RegistrationConfirmBtn from '~/components/pages/common/RegistrationConfirmBtn.vue'

export default {
  components: {
    ShopName,
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest,
    RegistrationConfirmBtn
  }
}
</script>
