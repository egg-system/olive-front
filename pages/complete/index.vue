<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <shop-name />
        <v-layout row>
          <v-flex>
            <v-card-text class="complete">
              予約を確定しました。<br>
              予約確定メールをお送りしましたので、ご確認ください。
            </v-card-text>
          </v-flex>
        </v-layout>
        <next-btn />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import NextBtn from '~/components/pages/complete/NextBtn.vue'

export default {
  components: {
    ShopName,
    NextBtn
  },
  beforeMount() {
    // 予約内容をクリア
    this.reset()
  },
  methods: {
    ...mapMutations('registration', ['reset'])
  }
}
</script>

<style>
.complete {
  color: red;
  font-weight: bolder;
}
</style>
