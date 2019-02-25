<style lang="scss">
.menu-contents {
  text-align: left;
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
}
.v-input--selection-controls .v-input__control,
.v-input--selection-controls {
  width: 100%;
  margin-top: 0px;
  padding-top: 0px;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>

<template>
  <section v-if="0 < subShops.length" class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <shop-name />
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
                          <v-select v-if="option.max_number" :items="getCountListForSelect(option.max_number, option.unit)"
                                    v-model="selectedMultiNumbersOfOptions[option.id]" :disabled="!selectedOptions.includes(option.id)" />
                        </div>
                      </div>
                    </transition>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </section>
        </v-radio-group>
        <reserve-btn @next="goNext"/>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ShopName from '~/components/pages/common/ShopName.vue'
import ReserveBtn from '~/components/pages/menu/ReserveBtn.vue'
export default {
  components: {
    ShopName,
    ReserveBtn
  },
  data: function() {
    return {
      selectedMenu: 0,
      selectedOptions: [],
      selectedMultiNumbersOfOptions: [] //耳つぼジュエリーの個数
    }
  },
  computed: {
    subShops() {
      return this.$store.state.menu.subShops
    },
    ...mapGetters({ getMenu: 'menu/getMenu', getOption: 'menu/getOption' })
  },
  created: function() {
    this.getMenus({ storeId: 1 })
    //次画面から戻ってきた場合、選択済みの値をstateから取り出し反映させる
    let selectedMenu = this.$store.state.select.selectedMenu
    let selectedOptions = this.$store.state.select.selectedOptions
    if (selectedMenu !== null) {
      this.selectedMenu = selectedMenu.id
    }
    selectedOptions.forEach(option => {
      this.selectedOptions.push(option.id)
      if (option.multiNumber) {
        this.selectedMultiNumbersOfOptions[option.id] = option.multiNumber
      }
    })
  },
  methods: {
    goNext: function() {
      let menu = this.getMenu(this.selectedMenu)
      let options = []
      this.selectedOptions.forEach(optionId => {
        let option = this.getOption(optionId)
        if (this.selectedMultiNumbersOfOptions[optionId]) {
          option.multiNumber = this.selectedMultiNumbersOfOptions[optionId]
          option.price = option.price * option.multiNumber
        }
        options.push(option)
      })
      this.setSelectedMenu({ selectedMenu: menu, selectedOptions: options })
      this.$router.push({ name: 'date' })
    },
    getCountListForSelect: function(max, unit) {
      let ret = []
      for (let i = 1; i <= max; i++) {
        ret.push({ value: i, text: i.toString() + unit })
      }
      return ret
    },
    changeOption: function(selectedOptions) {
      let self = this
      selectedOptions.forEach(optionId => {
        if (!this.selectedMultiNumbersOfOptions[optionId]) {
          this.selectedMultiNumbersOfOptions[optionId] = 1
        }
      })
      console.log(self.selectedMultiNumbersOfOptions.keys())
      let optionId
      self.selectedMultiNumbersOfOptions.forEach((val, optionId) => {
        console.log(optionId)
        if (!selectedOptions.includes(optionId)) {
          self.selectedMultiNumbersOfOptions.splice(optionId)
        }
      })
    },
    changeMenu: function(option) {
      this.selectedOptions = []
      this.selectedMultiNumbersOfOptions = []
    },
    ...mapActions({
      getMenus: 'menu/getMenus',
      setSelectedMenu: 'select/setSelectedMenu'
    })
  }
}
</script>
