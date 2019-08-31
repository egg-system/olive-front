<template>
  <v-app>
    <div>
      <app-header />
      <div>
        <mypage-navbar :is-shown.sync="isShownNabvar"/>
        <section class="container">
          <v-container grid-list-xl>
            <v-layout column>
              <mypage-name />
              <nuxt />
            </v-layout>
          </v-container>
        </section>
      </div>
      <mypage-footer :is-shown-navbar.sync="isShownNabvar" />
    </div>
  </v-app>
</template>

<script>
import MypageFooter from '~/components/pages/mypage/Footer.vue'
import AppHeader from '~/components/layouts/Header.vue'
import MypageNavbar from '~/components/pages/mypage/Navbar.vue'
import MypageName from '~/components/pages/mypage/Name.vue'

export default {
  components: {
    AppHeader,
    MypageFooter,
    MypageNavbar,
    MypageName
  },
  middleware: ['is-logged-in'],
  data() {
    return {
      isShownNabvar: false
    }
  }
}
</script>

<style>
@import '~/assets/mypage.css';
</style>
