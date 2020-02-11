<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center mb-4">
            <h3>ログイン情報</h3>
          </v-card-text>
        </v-card>
        <customer-password />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CustomerPassword from '~/components/pages/common/customer/Password.vue'

export default {
  components: {
    CustomerPassword
  }
}
</script>
