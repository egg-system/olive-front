<template>
  <v-layout row>
    <v-flex>
      <v-card :class="isProd ? 'bg-prod' : 'bg-other'">
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
  },
  computed: {
    isProd: function() {
      return process.env.NODE_ENV === 'prod'
    }
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
.bg-prod {
  background-color: #fffde7 !important;
}
.bg-other {
  background-color: #ffc107 !important;
}
</style>
