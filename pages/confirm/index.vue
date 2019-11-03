<template>
  <section class="container reservation_confirm">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row class="confirm-caution-section">
          <v-flex>
            <v-card-text class="notyet">
              <span class="txt_red">まだ予約は完了していません。</span><br>
              ご予約内容の最終確認をして「予約を確定する」ボタンを押してください。
            </v-card-text>
          </v-flex>
        </v-layout>
        <registration-menu :is-confirm="true"/>
        <registration-user-info :is-confirm="true"/>
        <registration-confirm-info :is-confirm="true"/>
        <registration-request :is-confirm="true"/>
        <fixed-btn/>
      </v-layout>
    </v-container>
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

<style scoped>
.notyet {
  font-weight: bolder;
}
.txt_red {
  color: #f00;
}
.elevation-1
  .v-table__overflow
  table.v-datatable.v-table.theme--light
  tr
  td:nth-of-type(1) {
  text-align: left;
}
.notyet {
  background-color: rgb(255, 253, 231);
}
</style>
