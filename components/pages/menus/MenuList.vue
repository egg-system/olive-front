<template>
  <div>
    <v-layout justify-center>
      <div v-if="hasSubShops">
        <v-flex
          v-for="subShop in displayShops"
          :key="subShop.id"
        >
          <v-card dark color="green darken-3" @click="scrollShopSection(subShop.id)">
            <v-card-text>
              <h3>{{ subShop.name }}</h3>
            </v-card-text>
          </v-card>
        </v-flex>
      </div>
    </v-layout>

    <v-radio-group v-model="selectedStoreMenu" class="menu-list">
      <section
        v-for="subShop in displayShops"
        :id="subShop.id"
        :key="subShop.id"
      >
        <v-layout :ref="subShop.id.toString()" column wrap>
          <v-flex class="mt-4">
            <v-card dark color="red lighten-2">
              <v-card-text>
                <h3>{{ subShop.name }}</h3>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card>
              <v-card-title primary-title>
                ご希望のメニューを選択してください
              </v-card-title>
              <div class="text-xs-right caption pb-2">
                ※金額は全て税抜きです。
              </div>
            </v-card>
            <div v-for="menu in subShop.menus" :key="menu.id">
              <menu-row :store-id="subShop.id" :menu="menu" />
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>
    
    <v-footer fixed height="auto" color="yellow lighten-5">
      <v-layout>
        <v-flex text-xs-center class="mb-2">
          <v-btn v-if="currentPageId > 1" class="font-weight-bold" large @click="backHour">
            戻る
          </v-btn>
          <v-btn :disabled="!isMenuSelected" color="warning" class="font-weight-bold"
                 large
                 @click="selectDate"
          >
            空席確認・予約する
          </v-btn>
          <v-btn v-if="isShownNextHourLink" color="warning" class="font-weight-bold"
                 large
                 @click="nextHour"
          >
            ２時間予約する
          </v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import MenuRow from './MenuRow.vue'

export default {
  components: { MenuRow },
  computed: {
    currentPageId() {
      const pageId = this.$nuxt.$route.query.menuIndex
      return Number(pageId)
    },
    displayShops() {
      if (this.menuIndex === 1 && this.storeId) {
        return this.subShops.filter(shop => shop.id === this.storeId)
      }

      return this.subShops
    },
    enableTwoHourReserve() {
      return false
    },
    selectedStoreMenu: {
      get() {
        return this.storeMenu
      },
      set(storeMenu) {
        this.setStoreMenu(storeMenu)
      }
    },
    isShownNextHourLink() {
      if (!this.enableTwoHourReserve) {
        return false
      }

      const selectedMenu = this.selectedStoreMenu.menu
      if (!selectedMenu) {
        return false
      }

      if (selectedMenu.minutes > 60) {
        return false
      }

      return this.currentPageId === 1
    },
    ...mapState('reservation/select', ['menuIndex', 'storeId']),
    ...mapState('menu', ['subShops']),
    ...mapGetters('menu', ['getMenu', 'getOption', 'hasSubShops']),
    ...mapGetters('reservation/select', [
      'storeMenu',
      'isMenuSelected',
      'selectedOptions',
      'selectedMenuParamsQuery'
    ])
  },
  methods: {
    scrollShopSection(shopId) {
      this.$refs[shopId.toString()][0].scrollIntoView(true)
    },
    selectDate() {
      const query = this.selectedMenuParamsQuery
      this.$router.push({ path: '/date', query })
    },
    nextHour() {
      const nextPageId = this.currentPageId + 1
      this.$router.push({ query: { menuIndex: nextPageId } })
    },
    backHour() {
      const beforePageId = this.currentPageId - 1
      this.$router.push({ query: { menuIndex: beforePageId } })
    },
    ...mapMutations('reservation/select', ['setStoreMenu'])
  }
}
</script>

<style scoped lang="scss">
.menu-list {
  justify-content: center;
}
</style>
