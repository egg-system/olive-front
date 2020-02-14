<template>
  <v-app>
    <div>
      <app-header :is-shown-navbar.sync="isShownNabvar" />
      <mypage-navbar :is-shown.sync="isShownNabvar" />
      <mypage-name />
      <nuxt />
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
