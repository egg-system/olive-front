<template>
  <div class="text-xs-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    page: {
      get() {
        return Number(this.$route.query.page)
      },
      set(page) {
        this.$router.push({
          name: 'mypage-reservations',
          query: { page: page, cancel: this.doCancel }
        })
      }
    },
    ...mapState('reservation', ['doCancel', 'totalPages'])
  }
}
</script>
