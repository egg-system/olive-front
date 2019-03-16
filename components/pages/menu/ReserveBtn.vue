<template>
  <div class="reserve-btn-area">
    <v-layout column>
      <v-flex xs6>
        <v-btn v-if="getMenuIndex == 1" @click="backToFirst">
          戻る
        </v-btn>
        <v-btn color="warning" @click="next">
          日時指定に進む
        </v-btn>
        <v-btn v-if="selectedMenu != null && selectedMenu.minutes != 120 && getMenuIndex == 0" color="warning" @click="twoHour">
          ２時間予約する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getMenuIndex: 'select/getMenuIndex',
      isTwoHour: 'select/isTwoHour',
      selectedMenu: 'select/getMenuNow'
    })
  },
  methods: {
    next() {
      this.$router.push({ name: 'date' })
    },
    twoHour() {
      this.setForGoNextMenu()
      window.scrollTo(0, 0)
    },
    backToFirst() {
      this.setForGoBackMenu()
      window.scrollTo(0, 0)
    },
    ...mapMutations({
      setTwoHoursCheck: 'select/setTwoHoursCheck',
      setForGoNextMenu: 'select/setForGoNextMenu',
      setForGoBackMenu: 'select/setForGoBackMenu'
    })
  }
}
</script>

<style>
.reserve-btn-area {
  text-align: center;
}
</style>
