<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
    app
  >
    <v-list v-for="list in lists" :key="list.subHeader">
      <v-subheader>
        <v-icon>{{ list.icon }}</v-icon>
        <span class="text-spacer"/>{{ list.subHeader }}
      </v-subheader>
      <v-list-tile
        v-for="link in list.links"
        :key="link.title"
        @click="link.function"
      >
        <v-list-tile-content>
          <v-list-tile-title >
            {{ link.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/> 
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    isShown: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    drawer: {
      get() {
        return this.isShown
      },
      set(isShown) {
        this.$emit('update:isShown', isShown)
      }
    },
    lists() {
      return [
        {
          subHeader: 'Home',
          icon: 'home',
          links: [
            {
              title: 'マイページトップ',
              function: this.top
            },
            {
              title: '登録情報変更',
              function: this.profile
            },
            {
              title: 'オリーヴボディケア店舗情報',
              function: () => {
                window.location = 'https://olivebodycare.healthcare/'
              }
            }
          ]
        },
        {
          subHeader: '予約',
          icon: 'schedule',
          links: [
            {
              title: 'たまプラーザ本店予約',
              function: () => this.reserve(1)
            },
            {
              title: '横浜青葉台店予約',
              function: () => this.reserve(3)
            },
            {
              title: '札幌円山店予約',
              function: () => this.reserve(4)
            }
          ]
        }
      ]
    }
  },
  methods: {
    reserve(shopId) {
      this.$router.push({ path: '/menus/', query: { shopId } })
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

<style lang="scss" scoped>
.text-spacer {
  width: 0.5em;
}

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
