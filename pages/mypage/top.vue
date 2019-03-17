<template>
  <div>
    <mypage-header />
    <v-container grid-list-xl>
      <v-layout column>
        <div>aaa</div>
        <div>aaa</div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MypageHeader from '~/components/pages/mypage/Header.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MypageHeader
  },
  data: () => ({
    link: '/mypage/top'
  }),
  computed: {
    ...mapState({
      login: state => state.login
    })
  },
  methods: {
    resisterBtn() {
      // 会員登録あり
      this.setIsCreate(true)
      this.$router.push('/registration')
    },
    ...mapMutations('login', ['setIsCreate'])
  }
}
</script>

<style>
</style>
