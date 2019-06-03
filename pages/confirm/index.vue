<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name/>
        <v-layout row class="confirm-caution-section">
          <v-flex>
            <v-card-text class="notyet">まだ予約は完了していません、ご予約内容の最終確認をしてください</v-card-text>
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
import ShopName from '~/components/pages/common/ShopName.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'
import FixedBtn from '~/components/pages/confirm/FixedBtn.vue'

export default {
  middleware: ['menu-selected', 'date-time-selected', 'is-registered'],
  components: {
    ShopName,
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
  color: red;
  font-weight: bolder;
}
.elevation-1
  .v-table__overflow
  table.v-datatable.v-table.theme--light
  tr
  td:nth-of-type(1) {
  text-align: left;
}
/* 
パパ修正待ち
div[data-v-f42b7a1c].request + div div.layout.column div.flex.xs6 {
  position: initial !important;
} 
*/
.notyet {
  background-color: rgb(255, 253, 231);
}
.menu
  .v-table__overflow
  table.v-datatable.v-table.theme--light
  tr:last-of-type {
  border-top: 2px solid;
}
</style>
