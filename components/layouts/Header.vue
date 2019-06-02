<template>
  <v-layout row>
    <v-flex>
      <v-card color="#fffde7">
        <v-card-title>
          <logo class="header-logo" />
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
a.logo:link,
a.logo:visited,
a.logo:active,
a.logo:hover {
  text-decoration: none;
  color: black;
}
.header-logo {
  margin: 0 auto;
}
</style>
