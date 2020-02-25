<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    width="280"
    temporary
    app
    class="yellow lighten-5"
  >
    <v-list>
      <v-list-group 
        v-for="list in lists" 
        :key="list.subHeader"
        v-model="list.active"
        :prepend-icon="list.icon"
        no-action
      >
        <template slot="activator">
          <v-list-item-title>
            {{ list.subHeader }}
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="link in list.links"
          :key="link.title"
          @click="link.function"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
          subHeader: 'ホーム',
          icon: 'home',
          active: true,
          links: [
            {
              title: 'マイページトップ',
              function: this.top
            },
            {
              title: '店舗ホームページ',
              function: () => {
                window.location = 'https://olivebodycare.healthcare/'
              }
            }
          ]
        },
        {
          subHeader: 'ユーザー',
          icon: 'person',
          active: true,
          links: [
            {
              title: '登録情報変更',
              function: this.profile
            },
            {
              title: 'パスワード変更',
              function: this.resetPassword
            },
            {
              title: 'ログアウト',
              function: this.doLogout
            }
          ]
        },
        {
          subHeader: '24時間Web予約',
          icon: 'schedule',
          active: true,
          links: [
            {
              title: 'たまプラーザ本店',
              function: () => this.reserve(1)
            },
            {
              title: '横浜青葉台店',
              function: () => this.reserve(3)
            },
            {
              title: '札幌円山店',
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
    doLogout() {
      this.logout()
      // マイページトップにリダイレクトさせる
      this.$router.push('/mypage/login')
    },
    resetPassword() {
      this.$router.push('/password/reset')
    },
    ...mapMutations('user', ['logout'])
  }
}
</script>
