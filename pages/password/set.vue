<template>
  <v-container class="min-height">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>
              パスワードの再設定
            </h3>
          </v-card-text>
        </v-card>

        <p>
          新パスワードを入力して「パスワードを登録する」でお進みください。
        </p>
        <customer-password />
        <set-btn />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CustomerPassword from '~/components/pages/common/customer/Password.vue'
import SetBtn from '~/components/pages/password/SetBtn.vue'

export default {
  middleware: ['set-authenticates'],
  components: {
    CustomerPassword,
    SetBtn
  }
}
</script>
