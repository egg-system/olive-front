<template>
  <v-flex align-self-baseline>
    <div v-if="shop" class="shop-name">{{ shop.name }}</div>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    shop() {
      return this.$store.state.shop
    }
  },
  created: function() {
    if (!this.$store.state.shop.id) {
      this.getShop({ id: 1 })
    }
  },
  methods: {
    ...mapActions({
      getShop: 'shop/getShop'
    })
  }
}
</script>
<style>
.shop-name {
  text-align: left;
}
</style>
