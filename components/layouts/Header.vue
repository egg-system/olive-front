<template>
  <v-toolbar :class="isProd ? 'bg-prod' : 'bg-other'">
    <v-btn
      v-if="isShownNavBtn"
      flat
      color="light-green darken-2"
      class="nav-menu-btn"
      @click.stop="showNavbar"
    >
      <v-icon>menu</v-icon>
      <span class="text-capitalize">Menu</span>
    </v-btn>
    <v-toolbar-title>
      <logo class="header-logo" />
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'

export default {
  components: {
    Logo
  },
  props: {
    isShownNavbar: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    isProd() {
      return process.env.isProd
    },
    isShownNavBtn() {
      return this.isShownNavbar !== null
    },
    drawer: {
      get() {
        return this.isShownNavbar
      },
      set(drawer) {
        this.$emit('update:isShownNavbar', drawer)
      }
    }
  },
  methods: {
    showNavbar() {
      this.drawer = true
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

.nav-menu-btn {
  width: 36px;
}
</style>
