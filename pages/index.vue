<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout justify-center>
        <v-flex>
          <v-progress-circular
            v-if="isProd"
            indeterminate
            size="100"
          />
          <div v-else class="text-center">
            <logo />
            <h1 class="display-1">
              olivebodycare
            </h1>
          </div>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex class="my-4">
          <div>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/mypage">
                /mypage
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/registration">
                /registration
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/option">
                /option
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/menus">
                /menus
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/login">
                /login
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/date">
                /date
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/confirm">
                /confirm
              </nuxt-link>
            </v-btn>
            <v-btn>
              <v-icon>
                link
              </v-icon>
              <nuxt-link to="/complete">
                /complete
              </nuxt-link>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Logo from '~/components/layouts/Logo.vue'

export default {
  middleware: ['top-page-redirector'],
  components: {
    Logo
  },
  computed: {
    isProd() {
      return this.$root.context.env.isProd
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
