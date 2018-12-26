<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="mainTitle">
        olive salon
      </h1>
      <div class="text-xs-center">
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/registration">
            /registration
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/option">
            /option
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/menu">
            /menu
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/login">
            /login
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/date">
            /date
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/confirm">
            /confirm
          </nuxt-link>
        </v-chip>
        <v-chip label text-color="white">
          <v-icon left>link</v-icon>
          <nuxt-link to="/complete">
            /complete
          </nuxt-link>
        </v-chip>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.mainTitle {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
