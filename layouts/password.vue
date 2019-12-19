<template>
  <v-app>
    <div>
      <app-header />
      <section class="container">
        <v-container grid-list-xl>
          <v-layout column wrap>
            <v-flex>
              <v-card dark color="red lighten-2">
                <v-card-text>
                  <h3 class="block">
                    パスワードの再設定
                  </h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <nuxt />
          </v-layout>
        </v-container>
      </section>
      <app-footer />
    </div>
  </v-app>
</template>

<script>
import AppFooter from '~/components/layouts/Footer.vue'
import AppHeader from '~/components/layouts/Header.vue'

export default {
  components: {
    AppFooter,
    AppHeader
  }
}
</script>

<style scoped>
.block {
  text-align: left;
}
</style>
