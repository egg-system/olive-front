<template>
  <v-toolbar :class="isProd ? 'bg-prod' : 'bg-other'">
    <v-btn
      v-if="isShownNavBtn"
      text
      color="green darken-3"
      @click.stop="showNavbar"
    >
      <v-icon>menu</v-icon>
      <span class="text-capitalize">Menu</span>
    </v-btn>
    <v-toolbar-title class="mt-2">
      <logo />
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
      return this.$root.context.env.isProd
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

<style lang="scss" scoped>
.bg-prod {
  background-color: #fffde7 !important;
}
.bg-other {
  background-color: #ffc107 !important;
}
</style>
