<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <v-card-text class="complete">
              <template v-if="user.isCreate">
                情報登録、および予約が確定しました。
              </template>
              <template v-else>
                予約が確定しました。
              </template>
              <br>予約確定メールをお送りしましたので、ご確認ください。
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
import NextBtn from '~/components/pages/complete/NextBtn.vue'

export default {
  beforeRouteLeave(to, from, next) {
    // reset漏れによるバグを防ぐため
    this.resetAllInputed()
    next()
  },
  components: {
    NextBtn
  },
  middleware: ['clear-selected-query', 'init-shop-id', 'is-registered'],
  async fetch({ store, error }) {
    try {
      const result = await store.dispatch(
        'reservation/registerCustomerWithReserve'
      )
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }

    const { errorMessage: reservationErrorMessage } = store.state.reservation
    const isReservationError = store.getters['reservation/isError']
    if (isReservationError) {
      error({
        statusCode: 500,
        message: `${reservationErrorMessage}<br>お手数ですが、再度ご予約の操作をお願いいたします。`
      })
    }

    const { errorMessage: userErrorMessage } = store.state.user
    const isUserError = store.getters['user/isError']
    if (isUserError) {
      error({
        statusCode: 401,
        message: `
          ${userErrorMessage}
          <br>お手数ですが最初からやり直してください。
          <br>※ 新規登録をせずに
          <a href="https://olivebodycare.healthcare/about/contact/">
            メールフォーム
          </a>
          からご予約いただくことも可能です。
        `
      })
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    const shopId = this.$route.query.shopId
    this.$gtm.pushEvent({
      event: `complete-reseravation-${shopId}`
    })
  },
  methods: {
    ...mapActions('reservation', ['resetAllInputed'])
  }
}
</script>

<style scoped>
.complete {
  color: red;
  font-weight: bolder;
}
</style>
