<template>
  <v-flex align-self-baseline>
    <div v-if="store">{{ store.name }}</div>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    store() {
      return this.$store.state.store.store
    }
  },
  created: function() {
    if (!this.$store.state.store.store) {
      this.getStore({ storeId: 1 })
    }
  },
  methods: {
    ...mapActions({
      getStore: 'store/getStore'
    })
  }
}
</script>
