<template>
  <v-app>
    <div>
      <app-header />
      <nuxt />
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppFooter from '~/components/layouts/Footer.vue'
import AppHeader from '~/components/layouts/Header.vue'

export default {
  components: {
    AppFooter,
    AppHeader
  }
}
</script>
