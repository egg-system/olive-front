<template>
  <div class="loginInfo">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>ログイン情報</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <customer-password />
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

<style>
.loginInfo {
  padding-top: 20px;
  text-align: left;
}
</style>
