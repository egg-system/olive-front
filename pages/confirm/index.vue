<template>
  <section class="container">
    <v-layout column>
      <v-layout justify-center>
        <v-flex xs10>
          <v-alert
            text
            dense
            outlined
            color="deep-orange"
            icon="warning"
            class="body-2"
          >
            まだ予約は完了していません。<br>
            ご予約内容の最終確認をして<strong>「予約を確定する」ボタンを押してください。</strong>
          </v-alert>
        </v-flex>
      </v-layout>
      <registration-menu :is-confirm="true" />
      <registration-user-info :is-confirm="true" />
      <registration-confirm-info :is-confirm="true" />
      <registration-request :is-confirm="true" />
      <fixed-btn />
    </v-layout>
  </section>
</template>

<script>
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'
import FixedBtn from '~/components/pages/confirm/FixedBtn.vue'

export default {
  middleware: [
    'init-shop-id',
    'fetch-menus-from-query',
    'set-date-time-from-query',
    'is-registered'
  ],
  components: {
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest,
    FixedBtn
  }
}
</script>
