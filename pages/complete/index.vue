<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout row>
          <v-flex>
            <v-card-text class="complete">
              <template v-if="login.isCreate">会員登録、および予約が確定しました。</template>
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
    login() {
      return this.$store.state.login
    }
  },
  async fetch({ store, error }) {
    try {
      const result = await store.dispatch(
        'reservation/registration/registerCustomerWithReserve'
      )

      const { registration } = store.state.reservation
      if (registration.isError) {
        error({
          statusCode: 500,
          message:
            registration.errorMessage +
            '\nお手数ですが、再度ご予約の操作をお願いいたします。'
        })
      }

      const { login } = store.state
      if (login.isError) {
        error({
          statusCode: 401,
          message:
            login.errorMessage + '\nお手数ですが最初からやり直してください。'
        })
      }
    } catch (e) {
      error({
        statusCode: (e.response && e.response.status) || 500,
        message: ''
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
