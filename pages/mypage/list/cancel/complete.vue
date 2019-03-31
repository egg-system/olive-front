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
            <v-card-text><h3 class="mypage-title">マイページトップ > 予約一覧 > 予約キャンセル完了</h3></v-card-text>
          </v-card>
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
    MypageHeader
  }
}
</script>

<style>
.mypage-title {
  color: white;
}
</style>
