<template>
  <div>
    <mypage-header />
    <v-container grid-list-xl>
      <v-layout column>
        <v-flex align-self-baseline>
          <div>山田　太郎　さん</div>
        </v-flex>

        <v-flex class="mypage-top">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧 > 予約キャンセル確認</h3></v-card-text>
          </v-card>
        </v-flex>

        <mypage-reserve-history :reserve-data="reserveData"/>

        <div class="message">予約をキャンセルします。よろしいですか？</div>
        <v-flex>
          <v-btn @click="back">戻る</v-btn>
          <v-btn color="warning" @click="complete">確定する</v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageReserveHistory from '~/components/pages/mypage/ReserveHistory.vue'

export default {
  components: {
    MypageHeader,
    MypageReserveHistory
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
      }
    ]
  }),
  methods: {
    complete() {
      this.$router.push('/mypage/list/cancel/complete')
    },
    back() {
      // ブラウザバック
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.mypage-title {
  color: white;
}
.message {
  margin-top: 15px;
}
</style>
