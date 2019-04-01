<template>
  <div>
    <mypage-header />
    <v-container grid-list-xl>
      <v-layout column>
        <mypage-name />

        <v-flex class="mypage-top">
          <v-card dark color="red lighten-2">
            <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧 > 予約キャンセル完了</h3></v-card-text>
          </v-card>
        </v-flex>

        <div>予約をキャンセルしました。</div>
        <div>予約キャンセルメールをお送りしましたので、ご確認ください。</div>

        <v-flex>
          <v-btn color="warning" @click="top">マイページトップへ</v-btn>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageReserveHistory from '~/components/pages/mypage/ReserveHistory.vue'
import MypageName from '~/components/pages/mypage/Name.vue'

export default {
  components: {
    MypageHeader,
    MypageName
  },
  methods: {
    top() {
      this.$router.push('/mypage/top')
    }
  }
}
</script>

<style>
.mypage-title {
  color: white;
}
</style>
