<template>
  <div>
    <mypage-header />
    <v-container grid-list-xl>
      <v-layout column>
        <mypage-name />

        <v-flex class="mypage-top">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">マイページトップ > 会員情報変更</h3></v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageReserveHistory from '~/components/pages/mypage/ReserveHistory.vue'
import MypageListPagination from '~/components/pages/mypage/ListPagination.vue'
import MypageName from '~/components/pages/mypage/Name.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader,
    MypageReserveHistory,
    MypageListPagination,
    MypageName
  },
  data: () => ({}),
  computed: {
    ...mapState({
      login: state => state.login
    })
  }
}
</script>

<style>
.mypage-top {
  text-align: left;
}
.mypage-title {
  color: white;
}
.under {
  background: linear-gradient(transparent 90%, #ff99ab 70%);
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
