<template>
  <section class="container">
    <div>
      <h1>login</h1>
      <div class="text-xs-center">
        <nuxt-link to="/registration">
          新規登録
        </nuxt-link>
      </div>
      <Form />
    </div>
  </section>
</template>


<script>
import Form from './Form.vue'

export default {
  components: {
    Form
  }
}
</script>
