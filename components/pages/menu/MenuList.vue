<template>
  <div>
    <v-radio-group v-model="selectedMenu" column>
      <section v-for="subShop in subShops" :key="'menuHead'+subShop.id" :id="'menuHead'+subShop.id" class="content-section">
        <v-layout column wrap>
          <v-flex>
            <v-card dark color="red lighten-2">
              <v-card-text><h3>{{ subShop.name }}</h3></v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <div v-for="menu in subShop.menus" :key="'menu'+menu.id">
              <v-card v-if="getMenuIndex == 0 || menu.minutes == 60">
                <v-card-title primary-title>
                  <v-radio :value="menu.id" @change="changeMenu">
                    <div slot="label" class="menu-info">
                      <span>{{ menu.name }}</span>
                      <span class="menu-price">{{ menu.price | priceFormat }}</span>
                      <span class="menu-duration">{{ menu.minutes | timeFormat }}</span>
                      <div class="description">{{ menu.description }}</div>
                    </div>
                  </v-radio>
                  <transition name="slide">
                    <div v-if="menu.options != null && 0 < menu.options.length && selectedMenu==menu.id" :key="'option-area'+menu.id" class="option-area">
                      <div v-for="option in menu.options" :key="'option'+option.id">
                        <v-checkbox v-model="selectedOptions" :value="option.id" @change="changeOption">
                          <div slot="label" class="menu-info">
                            <span>{{ option.name }}</span><span>{{ option.price | priceFormat }}</span><span v-if="option.max_number">/&nbsp;{{ option.unit }}</span>
                          </div>
                        </v-checkbox>
                        <v-select v-if="option.max_number" :items="getOptionNumberListForSelect(option.max_number, option.unit)"
                                  v-model="selectedNumbersOfOptions[option.id]" :disabled="!selectedOptions.includes(option.id)" />
                      </div>
                    </div>
                  </transition>
                </v-card-title>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>

    <v-layout column>
      <v-flex xs6>
        <v-btn v-if="getMenuIndex == 1" @click="backToFirst">
          戻る
        </v-btn>
        <v-btn color="warning" @click="next">
          日時指定に進む
        </v-btn>
        <v-btn v-if="selectedMenu != null && selectedMenu.minutes != 120 && getMenuIndex == 0" color="warning" @click="twoHour">
          ２時間予約する
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  data: function() {
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
        let selectedMenu = this.getSelectedMenu
        if (selectedMenu == null) {
          return null
        }
        return selectedMenu.id
      },
      set(id) {
        let menu = this.getMenu(id)
        this.setSelectedMenu(menu)
      }
    },
    selectedOptions: {
      get() {
        let selectedOptions = this.getSelectedOptions
        let ids = []
        selectedOptions.forEach(option => {
          ids.push(option.id)
        })
        return ids
      },
      set(ids) {
        let options = []
        ids.forEach(id => {
          let option = this.getOption(id)
          option = this.getOptionNumberSet(option)
          options.push(option)
        })
        this.setSelectedOptions(options)
      }
    },
    ...mapGetters({
      getMenu: 'menu/getMenu',
      getMenuIndex: 'select/getMenuIndex',
      getOption: 'menu/getOption',
      getSelectedMenu: 'select/getMenuNow',
      getSelectedOptions: 'select/getOptionsNow'
    })
  },
  watch: {
    selectedNumbersOfOptions: function(val) {
      this.selectedOptions = this.selectedOptions
    },
    subShops: function(subShops) {
      if (!this.selectedMenu) {
        this.selectedMenu = this.getDefaultMenu().id
      }
    },
    getSelectedMenu: function(val) {
      if (!this.selectedMenu && this.getDefaultMenu() != null) {
        this.selectedMenu = this.getDefaultMenu().id
      }
    }
  },
  created: function() {
    this.getMenus({ storeId: 1 })
    //次画面から戻ってきた場合、選択済みの値をstateから取り出し反映させる
    let selectedOptions = this.getSelectedOptions
    selectedOptions.forEach(option => {
      if (option.number) {
        this.selectedNumbersOfOptions[option.id] = option.number
      }
    })
  },
  methods: {
    getOptionNumberListForSelect: function(max, unit) {
      let ret = []
      for (let i = 1; i <= max; i++) {
        ret.push({ value: i, text: i.toString() + unit })
      }
      return ret
    },
    changeOption: function(selectedOptions) {
      let self = this
      selectedOptions.forEach(optionId => {
        if (!this.selectedNumbersOfOptions[optionId]) {
          this.selectedNumbersOfOptions[optionId] = 1
        }
      })
      self.selectedNumbersOfOptions.forEach((val, optionId) => {
        console.log(optionId)
        if (!selectedOptions.includes(optionId)) {
          //self.selectedNumbersOfOptions.splice(optionId)
          self.selectedNumbersOfOptions[optionId] = 0
          let test = 1
        }
      })
    },
    changeMenu: function(option) {
      this.selectedOptions = []
      this.selectedNumbersOfOptions = []
    },
    getOptionNumberSet(optionParam) {
      let option = _.clone(optionParam)
      if (this.selectedNumbersOfOptions[option.id]) {
        option.number = this.selectedNumbersOfOptions[option.id]
        option.price = option.price * option.number
      }
      return option
    },
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
