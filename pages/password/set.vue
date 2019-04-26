<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex>
          <v-card dark color="red lighten-2">
            <v-card-text>
              <h3 class="block">パスワードの再設定</h3>
            </v-card-text>
          </v-card>
        </v-flex>

        <div class="input">
          <h3 class="block">新パスワードを入力して「次へ」でお進みください。</h3>
          <customer-password />
        </div>

        <v-flex>
          <set-btn />
        </v-flex>

      </v-layout>

    </v-container>
  </section>
</template>

<script>
import CustomerPassword from '~/components/pages/common/customer/Password.vue'
import SetBtn from '~/components/pages/password/reset/SetBtn.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    CustomerPassword,
    SetBtn
  }
}
</script>

<style scoped>
.input {
  width: 90%;
  margin: 0 auto;
}
.block {
  text-align: left;
}
</style>
