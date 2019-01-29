<template>
  <section class="container">
    <div>
      <h1>confirm</h1>
      <div class="text-xs-center">
        <nuxt-link to="/complete">
          確定
        </nuxt-link>
        {{ this.$store.state.registration.userInfo.firstName }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  beforeMount() {}
}
</script>
