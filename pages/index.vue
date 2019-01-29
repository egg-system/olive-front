<template>
  <section class="container">
    <div>
      <logo/>
      <h2>
        オリーヴボディーケア予約<br>ログインしてご予約ください。
      </h2>
      <Form />
      <a href="https://olivebodycare.jp/web-reservation/email/">
        新規会員登録をご希望の方はこちらから
      </a>
    </div>
  </section>
</template>

<script>
import Form from '~/pages/login/Form.vue'

export default {
  components: {
    Form
  }
}
</script>

<style>
</style>
