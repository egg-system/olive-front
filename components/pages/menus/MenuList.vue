<template>
  <div class="menu-content">
    <div v-if="hasSubShops" class="linkBtn">
      <v-flex
        v-for="subShop in displayShops"
        :key="subShop.id"
      >
        <v-card dark color="red lighten-2" @click="scrollShopSection(subShop.id)">
          <v-card-text>
            <h3>{{ subShop.name }}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </div>

    <v-radio-group v-model="selectedStoreMenu" column class="menu-list">
      <section
        v-for="subShop in displayShops"
        :key="subShop.id"
        :id="subShop.id"
        class="content-section"
      >
        <v-layout :ref="subShop.id.toString()" column wrap >
          <v-flex>
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
                <p class="taxLabel">※金額は全て税抜きです。</p>
              </v-card-title>
            </v-card>
            <div v-for="menu in subShop.menus" :key="menu.id">
              <menu-row :store-id="subShop.id" :menu="menu"/>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>

    <v-layout column class="btn_fix">
      <v-flex xs6>
        <v-btn v-if="currentPageId > 1" @click="backHour">戻る</v-btn>
        <v-btn :disabled="!isMenuSelected" color="warning" @click="selectDate">空席確認・予約する</v-btn>
        <v-btn v-if="isShownNextHourLink" color="warning" @click="nextHour">２時間予約する</v-btn>
      </v-flex>
    </v-layout>
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
      'selectedOptions'
    ])
  },
  methods: {
    scrollShopSection(shopId) {
      this.$refs[shopId.toString()][0].scrollIntoView(true)
    },
    selectDate() {
      this.$router.push({ name: 'date' })
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

<style lang="scss">
.menu-content {
  display: flex;
  flex-direction: column;
}
.menu-list {
  justify-content: center;
}
section.content-section {
  margin-bottom: 20px;
  ul {
    padding-left: 0px;
  }
  .menu-category {
    display: inline-block;
    width: 50%;
    font-size: 18px;
    border: solid 1px #000000;
    padding: 10px 0;
  }
  .menu-name {
    font-weight: bold;
  }
  .menu-info {
    text-align: left;
    span,
    .description {
      margin-left: 15px;
    }
  }

  p {
    margin-top: 10px;
    text-align: left;
  }

  p.taxLabel {
    font-size: 0.8em;
    margin: 0;
    min-width: 100%;
    text-align: right;
  }
}
.option-area {
  width: 100%;
  margin: 1em;

  .option-header {
    @extend .menu-info;
    margin-bottom: 0.5em;
  }
}

.btn_fix {
  .flex {
    &.xs6 {
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      background-color: rgb(255, 253, 231);
    }
  }
}
.linkBtn {
  .flex {
    display: inline-block;
    vertical-align: top;
    @media screen and (max-width: 767px) {
      width: 100%;
      padding: 0.2em !important;
    }
    &:hover {
      cursor: pointer;
    }
    .v-card {
      width: 22em;
      height: 5em;
      display: flex;
      align-items: center;
      background-color: #689f38 !important;
      @media screen and (max-width: 767px) {
        width: 100%;
        height: 6em;
        margin: 0 0.2em;
      }
    }
  }
  & + .v-input {
    justify-content: center;
    width: 50%;
    margin: 1em auto;
    @media screen and (max-width: 767px) {
      width: 95%;
    }
    .v-input__control {
      width: 100% !important;
    }
  }
}
</style>
