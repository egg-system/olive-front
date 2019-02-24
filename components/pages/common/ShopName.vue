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
      return this.$store.state.shop
    }
  },
  created: function() {
    if (!this.$store.state.shop.id) {
      this.getStore({ id: 1 })
    }
  },
  methods: {
    ...mapActions({
      getStore: 'shop/getShop'
    })
  }
}
</script>
