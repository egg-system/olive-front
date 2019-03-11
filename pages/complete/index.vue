<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name />
        <v-layout row>
          <v-flex>
            <v-card-text v-if="!registration.isError && !login.isError" class="complete">
              予約を確定しました。<br>
              予約確定メールをお送りしましたので、ご確認ください。
            </v-card-text>
            <v-card-text v-if="registration.isError" class="complete">
              予約エラーが発生しました。お手数ですが最初からやり直してください。
            </v-card-text>
            <v-card-text v-if="login.isError" class="complete">
              会員登録エラーが発生しました。お手数ですが最初からやり直してください。
            </v-card-text>
          </v-flex>
        </v-layout>
        <next-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import NextBtn from '~/components/pages/complete/NextBtn.vue'

export default {
  components: {
    ShopName,
    NextBtn
  },
  computed: mapState({
    registration: state => state.registration,
    login: state => state.login
  }),
  created() {
    // 予約内容をクリア
    this.reset()
    // 予約確定
    this.reserveCommit('customerId').then(isReserveOk => {
      // 会員登録
      if (isReserveOk && this.login.isCreate) {
        this.customerCreate()
      }
    })
  },
  methods: {
    ...mapMutations('registration', ['reset']),
    ...mapActions({
      reserveCommit: 'registration/reserveCommit',
      customerCreate: 'login/customerCreate'
    })
  }
}
</script>

<style>
.complete {
  color: red;
  font-weight: bolder;
}
</style>
