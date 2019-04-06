<template>
  <div>
    <mypage-header />
    <section class="container">
      <v-container grid-list-xl>
        <v-layout column>
          <mypage-name />

          <v-flex class="mypage-top">
            <v-card dark color="red lighten-2">
              <v-card-text><h3 class="mypage-title">マイページトップ > 会員情報変更完了</h3></v-card-text>
            </v-card>
          </v-flex>

          <div>会員情報の変更が完了しました</div>
          <v-flex xs6>
            <v-btn color="warning" @click="goMypageTop">
              マイページトップへ
            </v-btn>
          </v-flex>
          
        </v-layout>
      </v-container>

    </section>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageName from '~/components/pages/mypage/Name.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader,
    MypageName
  },
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    goMypageTop() {
      this.$router.push('/mypage/top')
    }
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
.pr {
  width: 90%;
  margin: 0 auto;
}
.under {
  background: linear-gradient(transparent 90%, #ff99ab 70%);
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
</style>
