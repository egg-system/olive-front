<template>
  <v-layout
    align-start
    justify-end
    row
    fill-height
    class="headMenu"
  >
    <v-btn dark class="mybtn" @click="top">
      マイページ<br>トップ
    </v-btn>
    <v-btn dark class="mybtn" href="https://reserve.olivebodycare.healthcare/menus/?shopId=1&menuIndex=1">
      たまプラーザ<br>本店予約
    </v-btn>
    <v-btn dark class="mybtn bg_gray" href="https://reserve.olivebodycare.healthcare/menus/?shopId=3&menuIndex=1">
      横浜青葉台店<br>予約
    </v-btn>
    <v-btn dark class="mybtn" href="https://olivebodycare.healthcare/">
      オリーヴボディケア<br>店舗情報
    </v-btn>
    <v-btn dark class="mybtn" @click="profile">
      登録情報<br>変更
    </v-btn>
    <v-btn dark class="mybtn" @click="logoutBtn">
      ログアウト
    </v-btn>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    reserve() {
      this.$router.push('/menus')
    },
    top() {
      this.$router.push('/mypage')
    },
    profile() {
      this.$router.push('/mypage/profile/edit')
    },
    logoutBtn() {
      this.logout()
      // マイページトップにリダイレクトさせる
      this.$router.push('/mypage/login')
    },
    ...mapMutations('login', ['logout'])
  }
}
</script>

<style lang="scss">
.headMenu {
  display: block;
  width: 75%;
  margin: 1em auto 0;
  text-align: center;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  .mybtn {
    background-color: #689f38 !important;
    text-align: center;
    &.bg_gray {
      background-color: #ccc !important;
      cursor: initial;
    }
    &.v-btn {
      width: 30%;
      height: 3em;
      @media screen and (max-width: 767px) {
        width: 45%;
        margin: 0.3em 0.2em;
      }
    }
    .v-btn__content {
      font-weight: normal;
      font-size: 1em;
      line-height: 1.2;
      @media screen and (max-width: 767px) {
        font-size: 0.9em;
      }
    }
  }
}
</style>
