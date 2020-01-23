<template>
  <v-app>
    <div>
      <app-header :is-shown-navbar.sync="isShownNabvar" />
      <div class="mypage-body">
        <mypage-navbar :is-shown.sync="isShownNabvar" />
        <section class="container">
          <v-container grid-list-xl>
            <v-layout column>
              <mypage-name />
              <nuxt />
            </v-layout>
          </v-container>
        </section>
      </div>
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppFooter from '~/components/layouts/Footer.vue'
import AppHeader from '~/components/layouts/Header.vue'
import MypageNavbar from '~/components/pages/mypage/Navbar.vue'
import MypageName from '~/components/pages/mypage/Name.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
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

<style scoped>
@import '~/assets/mypage.css';
</style>
