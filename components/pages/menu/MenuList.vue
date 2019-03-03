<template>
  <v-radio-group v-model="selectedMenu" column>
    <section v-for="subShop in subShops" :key="'menuHead'+subShop.id" :id="'menuHead'+subShop.id" class="content-section">
      <v-layout column wrap>
        <v-flex>
          <v-card dark color="red lighten-2">
            <v-card-text><h3>{{ subShop.name }}</h3></v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card v-for="menu in subShop.menus" :key="'menu'+menu.id">
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
        </v-flex>
      </v-layout>
    </section>
  </v-radio-group>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
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
        let selectedMenu = this.$store.state.select.menu
        if (selectedMenu == null) {
          return null
        }
        return this.$store.state.select.menu.id
      },
      set(id) {
        let menu = this.getMenu(id)
        this.setSelectedMenu(menu)
      }
    },
    selectedOptions: {
      get() {
        let selectedOptions = this.$store.state.select.options
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
      getOption: 'menu/getOption',
      getFirstMenu: 'menu/getFirstMenu'
    })
  },
  watch: {
    selectedNumbersOfOptions: function(val) {
      this.selectedOptions = this.selectedOptions
    },
    subShops: function(subShops) {
      if (!this.selectedMenu) {
        this.selectedMenu = subShops[0].menus[0].id
      }
    }
  },
  created: function() {
    this.getMenus({ storeId: 1 })
    //次画面から戻ってきた場合、選択済みの値をstateから取り出し反映させる
    let selectedOptions = this.$store.state.select.options
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
      //console.log(self.selectedNumbersOfOptions.keys())
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
      let option = JSON.parse(JSON.stringify(optionParam))
      if (this.selectedNumbersOfOptions[option.id]) {
        option.number = this.selectedNumbersOfOptions[option.id]
        option.price = option.price * option.number
      }
      return option
    },
    ...mapActions({
      getMenus: 'menu/getMenus'
    }),
    ...mapMutations('select', ['setSelectedMenu', 'setSelectedOptions'])
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
