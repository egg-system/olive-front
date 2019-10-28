<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <v-card-text class="complete">
              <template v-if="user.isCreate">会員登録、および予約が確定しました。</template>
              <template v-else>予約が確定しました。</template>
              <br>予約確定メールをお送りしましたので、ご確認ください。
            </v-card-text>
          </v-flex>
        </v-layout>
        <next-btn/>
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
  middleware: [
    'menu-selected',
    'date-time-selected',
    'is-registered',
    'init-shop-id'
  ],
  computed: {
    registration() {
      return this.$store.state.reservation.registration
    },
    user() {
      return this.$store.state.user
    }
  },
  async fetch({ store, error }) {
    try {
      const result = await store.dispatch(
        'reservation/registration/registerCustomerWithReserve'
      )
    } catch (e) {
      error({ statusCode: (e.response && e.response.status) || 500 })
    }

    const { registration } = store.state.reservation
    if (registration.isError) {
      error({
        statusCode: 500,
        message: `${
          registration.errorMessage
        }<br>お手数ですが、再度ご予約の操作をお願いいたします。`
      })
    }

    const { user } = store.state
    if (user.isError) {
      error({
        statusCode: 401,
        message: `${
          user.errorMessage
        }<br>お手数ですが最初からやり直してください。`
      })
    }
  },
  methods: {
    ...mapActions('reservation/registration', ['resetAllInputed'])
  }
}
</script>

<style>
.complete {
  color: red;
  font-weight: bolder;
}
</style>
