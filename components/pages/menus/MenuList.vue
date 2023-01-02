<template>
  <div>
    <v-layout justify-center>
      <div v-if="hasSubShops">
        <v-flex
          v-for="subShop in displayShops"
          :key="subShop.id"
        >
          <v-card color="green darken-3" class="mt-4" @click="scrollShopSection(subShop.id)">
            <v-card-text class="white--text">
              <h3>{{ subShop.name }}</h3>
            </v-card-text>
          </v-card>
        </v-flex>
      </div>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm8 md7
              lg6
              xl4
      >
        <v-radio-group v-model="selectedStoreMenu">
          <div
            v-for="subShop in displayShops"
            :id="subShop.id"
            :key="subShop.id"
          >
            <v-layout :ref="subShop.id.toString()" wrap>
              <v-flex class="mt-6">
                <v-card color="red lighten-2">
                  <v-card-text class="white--text">
                    <h3>{{ subShop.name }}</h3>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-card-title primary-title>
                    ご希望のメニューを選択してください
                  </v-card-title>
                  <div class="text-right body-2 pb-2">
                    <div v-if="isDisplayTax">
                      ※金額は全て税込です。
                    </div>
                    <div v-else>
                      ※金額は全て税抜きです。
                    </div>
                  </div>
                </v-card>
                <div v-for="menu in subShop.menus" :key="`${subShop.id}-${menu.id}`">
                  <menu-row :store-id="subShop.id" :menu="menu" :is-display-tax="isDisplayTax" />
                </div>
              </v-flex>
            </v-layout>
          </div>
        </v-radio-group>
      </v-flex>
    </v-layout>

    <v-footer fixed height="auto" color="yellow lighten-5">
      <v-layout>
        <v-flex text-center>
          <v-btn v-if="currentPageId > 1" class="font-weight-bold" large @click="backHour">
            戻る
          </v-btn>
          <v-btn
            class="font-weight-bold"
            large
            :disabled="!isMenuSelected"
            color="warning"
            @click="selectDate"
          >
            空席確認・予約する
          </v-btn>
          <v-btn
            v-if="isShownNextHourLink" class="font-weight-bold"
            large
            color="warning"
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
      // ラジオボックスにチェックがつかない現象を回避するため
      //  チェックの判定に、===演算子を使っているので、objectは不可
      get() {
        return JSON.stringify(this.storeMenu)
      },
      set(storeMenu) {
        const parsedMenu = JSON.parse(storeMenu)
        this.setStoreMenu(parsedMenu)
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
    ]),
    ...mapGetters('tax', ['isDisplayTax'])
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
</style>
