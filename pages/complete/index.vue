<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name/>
        <v-layout row>
          <v-flex>
            <v-card-text v-if="!registration.isError && !login.isError" class="complete">
              <template v-if="login.isCreate">会員登録、および予約が確定しました。</template>
              <template v-else>予約が確定しました。</template>
              <br>予約確定メールをお送りしましたので、ご確認ください。
            </v-card-text>
            <v-card-text
              v-if="registration.isError"
              class="complete"
            >{{ registration.errorMessage }}<br>お手数ですが、再度ご予約の操作をお願いいたします。</v-card-text>
            <v-card-text
              v-if="login.isError"
              class="complete"
            >{{ login.errorMessage }}お手数ですが最初からやり直してください。</v-card-text>
          </v-flex>
        </v-layout>
        <next-btn/>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import NextBtn from '~/components/pages/complete/NextBtn.vue'

export default {
  beforeRouteLeave(to, from, next) {
    // reset漏れによるバグを防ぐため
    this.resetAllInputed()
    next()
  },
  components: {
    ShopName,
    NextBtn
  },
  middleware: ['menu-selected', 'date-time-selected', 'is-registered'],
  computed: {
    registration() {
      return this.$store.state.registration
    },
    login() {
      return this.$store.state.login
    }
  },
  async asyncData({ store }) {
    const result = await store.dispatch(
      'registration/registerCustomerWithReserve'
    )
  },
  methods: {
    ...mapActions('registration', ['resetAllInputed'])
  }
}
</script>

<style>
.complete {
  color: red;
  font-weight: bolder;
}
</style>
