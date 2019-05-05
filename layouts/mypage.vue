<template>
  <v-app>
    <div>
      <app-header />
      <div>
        <mypage-header />
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
import MypageHeader from '~/components/pages/mypage/Header.vue'
import MypageName from '~/components/pages/mypage/Name.vue'

export default {
  components: {
    AppFooter,
    AppHeader,
    MypageHeader,
    MypageName
  },
  middleware: ['is-logged-in']
}
</script>

<style>
@import '~/assets/mypage.css';
</style>
