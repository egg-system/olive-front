<template>
  <div>
    <v-radio-group v-model="selectedMenu" column>
      <section
        v-for="subShop in subShops"
        :key="'menuHead'+subShop.id"
        :id="'menuHead'+subShop.id"
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
            <div v-for="menu in subShop.menus" :key="'menu'+menu.id">
              <menu-row :menu="menu" :selected-option-count.sync="selectedNumbersOfOptions"/>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>

    <v-layout column>
      <v-flex xs6>
        <v-btn v-if="getMenuIndex == 1" @click="backToFirst">戻る</v-btn>
        <v-btn color="warning" @click="next">日時指定に進む</v-btn>
        <v-btn
          v-if="selectedMenu != null && selectedMenu.minutes != 120 && getMenuIndex == 0"
          color="warning"
          @click="twoHour"
        >２時間予約する</v-btn>
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
  data() {
    return {
      selectedNumbersOfOptions: [] //耳つぼジュエリーの個数
    }
  },
  computed: {
    subShops() {
      return this.$store.state.menu.subShops
    },
    selectedMenu: {
      get() {
        return this.selectedMenuId
      },
      set(id) {
        let menu = this.getMenu(id)
        this.setSelectedMenu(menu)
      }
    },
    ...mapGetters({
      getMenu: 'menu/getMenu',
      getMenuIndex: 'select/getMenuIndex',
      getOption: 'menu/getOption',
      getSelectedMenu: 'select/getMenuNow',
      getSelectedOptions: 'select/getOptionsNow',
      selectedMenuId: 'select/selectedMenuId'
    })
  },
  watch: {
    selectedNumbersOfOptions(val) {
      this.selectedOptions = this.selectedOptions
    },
    subShops(subShops) {
      if (!this.selectedMenu) {
        this.selectedMenu = this.getDefaultMenu().id
      }
    },
    getSelectedMenu(val) {
      if (!this.selectedMenu && this.getDefaultMenu() != null) {
        this.selectedMenu = this.getDefaultMenu().id
      }
    }
  },
  created() {
    this.getMenus({ shopId: 1 })
  },
  methods: {
    next() {
      this.$router.push({ name: 'date' })
    },
    twoHour() {
      this.setForGoNextMenu()
      this.selectedNumbersOfOptions = []
      window.scrollTo(0, 0)
    },
    backToFirst() {
      this.setForGoBackMenu()
      window.scrollTo(0, 0)
      let selectedOptions = this.getSelectedOptions
      selectedOptions.forEach(option => {
        if (option.number) {
          this.selectedNumbersOfOptions[option.id] = option.number
        }
      })
    },
    ...mapActions({
      getMenus: 'menu/getMenus'
    }),
    ...mapGetters({
      getDefaultMenu: 'menu/getDefaultMenu'
    }),
    ...mapMutations('select', [
      'setSelectedMenu',
      'setSelectedOptions',
      'setTwoHoursCheck',
      'setForGoNextMenu',
      'setForGoBackMenu'
    ])
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
}
</style>
