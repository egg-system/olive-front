<template>
  <div>

    <v-flex class="mypage-top">
      <v-card dark color="red lighten-2">
        <v-card-text><h3 class="mypage-title">マイページトップ > 会員情報変更完了</h3></v-card-text>
      </v-card>
    </v-flex>

    <div>会員情報の変更が完了しました</div>
    <v-btn color="warning" @click="goMypageTop">
      マイページトップへ
    </v-btn>

  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageName from '~/components/pages/mypage/Name.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'mypage',
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
