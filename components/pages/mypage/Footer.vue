<template>
  <v-footer height="60" fixed color="#fffde7">
    <v-flex text-xs-center>
      <v-icon size="50" @click="showNavbar">menu</v-icon>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  props: {
    isShownNavbar: {
      type: Boolean,
      required: true
    }
  },
  computed: {
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
