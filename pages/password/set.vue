<template>
  <div>
    <div class="input">
      <h3 class="block">新パスワードを入力して「次へ」でお進みください。</h3>
      <customer-password/>
    </div>
    <v-flex>
      <set-btn/>
    </v-flex>
  </div>
</template>

<script>
import CustomerPassword from '~/components/pages/common/customer/Password.vue'
import SetBtn from '~/components/pages/password/SetBtn.vue'

export default {
  middleware: ['set-authenticates'],
  layout: 'password',
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
</style>
