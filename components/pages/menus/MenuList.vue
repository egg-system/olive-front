<template>
  <div>
    <v-radio-group v-model="selectedStoreMenu" column>
      <section
        v-for="subShop in subShops"
        :key="subShop.id"
        :id="subShop.id"
        class="content-section"
      >
        <v-layout column wrap>
          <v-flex>
            <v-card dark color="red lighten-2">
              <v-card-text>
                <h3>{{ subShop.name }}</h3>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card>
              <v-card-title primary-title>メニュー選択</v-card-title>
            </v-card>
            <div v-for="menu in subShop.menus" :key="menu.id">
              <menu-row :store-id="subShop.id" :menu="menu"/>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>

    <v-layout column>
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
    selectedStoreMenu: {
      get() {
        return this.storeMenu
      },
      set(storeMenu) {
        this.setStoreMenu(storeMenu)
      }
    },
    isMenuSelected() {
      return this.storeMenu.menu !== null
    },
    isShownNextHourLink() {
      const selectedMenu = this.selectedStoreMenu.menu
      if (!selectedMenu) {
        return false
      }

      if (selectedMenu.minutes > 60) {
        return false
      }

      return this.currentPageId === 1
    },
    ...mapState('select', ['menuIndex']),
    ...mapState('menu', ['subShops']),
    ...mapGetters('menu', ['getMenu', 'getOption']),
    ...mapGetters('select', ['storeMenu', 'selectedOptions'])
  },
  created() {
    this.getMenus({ shopId: 1 })
  },
  methods: {
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
    ...mapActions('menu', ['getMenus']),
    ...mapMutations('select', ['setStoreMenu'])
  }
}
</script>

<style lang="scss">
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
}
.option-area {
  width: 100%;
  margin: 1em;

  .option-header {
    @extend .menu-info;
    margin-bottom: 0.5em;
  }
}
</style>
