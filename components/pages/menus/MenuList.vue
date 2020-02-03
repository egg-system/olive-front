<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <div v-if="hasSubShops">
          <v-flex
            v-for="subShop in displayShops"
            :key="subShop.id"
          >
            <v-card color="green darken-3" @click="scrollShopSection(subShop.id)">
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
          <v-radio-group v-model="selectedStoreMenu" column>
            <div
              v-for="subShop in displayShops"
              :id="subShop.id"
              :key="subShop.id"
            >
              <v-layout :ref="subShop.id.toString()" column wrap>
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
                    <div class="text-right">
                      ※金額は全て税抜きです。
                    </div>
                  </v-card>
                  <div v-for="menu in subShop.menus" :key="menu.id">
                    <menu-row :store-id="subShop.id" :menu="menu" />
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer fixed height="auto" color="yellow lighten-5">
      <v-layout>
        <v-flex text-center>
          <v-btn v-if="currentPageId > 1" class="font-weight-bold" large @click="backHour">
            戻る
          </v-btn>
          <v-btn class="font-weight-bold" large :disabled="!isMenuSelected"
                color="warning"
                @click="selectDate"
          >
            空席確認・予約する
          </v-btn>
          <v-btn v-if="isShownNextHourLink" class="font-weight-bold" large
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
// .menu-content {
//   display: flex;
//   flex-direction: column;
// }
// .menu-list {
//   justify-content: center;
// }
// section.content-section {
//   margin-bottom: 20px;

//   p {
//     margin-top: 10px;
//     text-align: left;
//   }

//   p.taxLabel {
//     font-size: 0.8em;
//     margin: 0;
//     min-width: 100%;
//     text-align: right;
//   }
// }

// .btn_fix {
//   /* eslint-disable-next-line vue-scoped-css/no-unused-selector */
//   .flex {
//     &.xs6 {
//       position: fixed;
//       bottom: 0;
//       width: 100%;
//       left: 0;
//       background-color: rgb(255, 253, 231);
//     }
//   }
// }

// .linkBtn {
//   /* eslint-disable-next-line vue-scoped-css/no-unused-selector */
//   .flex {
//     display: inline-block;
//     vertical-align: top;
//     @media screen and (max-width: 767px) {
//       width: 100%;
//       padding: 0.2em !important;
//     }
//     &:hover {
//       cursor: pointer;
//     }
//     /* eslint-disable-next-line vue-scoped-css/no-unused-selector */
//     .v-card {
//       width: 22em;
//       height: 5em;
//       display: flex;
//       align-items: center;
//       background-color: #689f38 !important;
//       @media screen and (max-width: 767px) {
//         width: 100%;
//         height: 6em;
//         margin: 0 0.2em;
//       }
//     }
//   }
/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
//   & + .v-input {
//     justify-content: center;
//     width: 50%;
//     margin: 1em auto;
//     @media screen and (max-width: 767px) {
//       width: 95%;
//     }
//     /* eslint-disable-next-line vue-scoped-css/no-unused-selector */
//     .v-input__control {
//       width: 100% !important;
//     }
//   }
// }

// .layout.column .flex.xs6 button {
//   width: 80%;
// }

// .layout.column .flex.xs6 button .v-btn__content {
//   display: block;
//   width: 100%;
// }

// .layout.column .flex.xs6 {
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   left: 0;
//   background-color: rgb(255, 253, 231);
// }

// .warning {
//   width: 80%;
// }
</style>
