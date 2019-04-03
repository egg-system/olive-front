<template>
  <div>
    <mypage-header />
    <section class="container">
      <v-container grid-list-xl>
        <v-layout column>
          <mypage-name />

          <v-flex class="mypage-top">
            <v-card dark color="red lighten-2">
              <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧</h3></v-card-text>
            </v-card>
          </v-flex>

          <h3><p class="under">予約一覧</p></h3>
          <mypage-reserve-history :reserve-data="reserveData" :is-cancel-btn-hide="false"/>
          <mypage-list-pagination />

        </v-layout>
      </v-container>
    </section>
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
  data: () => ({
    reserveData: [
      {
        status: ['予約中', '◯◯◯店'],
        menu: [
          '2019/03/01 10:00',
          '3456789012',
          '通常整体コース　60分',
          '¥6,000(税抜)'
        ]
      },
      {
        status: ['キャンセル', '◯◯◯店'],
        menu: [
          '2019/03/01 10:00',
          '3456789012',
          '通常整体コース　60分',
          '¥6,000(税抜)'
        ]
      },
      {
        status: ['来店済', '◯◯◯店'],
        menu: [
          '2019/03/01 10:00',
          '3456789012',
          '通常整体コース　60分',
          '¥6,000(税抜)'
        ]
      }
    ]
  }),
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
