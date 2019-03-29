<template>
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
        <div v-if="isShownOptionSlide" :key="'option-area'+menu.id" class="option-area">
          <div v-for="option in menu.options" :key="'option'+option.id">
            <v-checkbox v-model="selectedOptions" :value="option.id" @change="changeOption">
              <div slot="label" class="menu-info">
                <span>{{ option.name }}</span>
                <span>{{ option.price | priceFormat }}</span>
                <span v-if="option.max_number">/&nbsp;{{ option.unit }}</span>
              </div>
            </v-checkbox>
            <v-select
              v-if="option.max_number"
              :items="getOptionNumberListForSelect(option.max_number, option.unit)"
              v-model="selectedNumbersOfOptions[option.id]"
              :disabled="!selectedOptions.includes(option.id)"
            />
          </div>
        </div>
      </transition>
    </v-card-title>
  </v-card>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    menu: {
      type: Object,
      required: true
    },
    // 耳つぼジュエリーの個数
    selectedOptionCount: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasOption() {
      if (!('option' in this.menu) || this.menu.options === null) {
        return false
      }

      return this.menu.options.length > 0
    },
    isShownOptionSlide() {
      const isSelectedMenu = this.selectedMenuId === this.menu.id
      return isSelectedMenu && this.hasOption
    },
    selectedOptions: {
      get() {
        return this.getSelectedOptions.map(option => option.id)
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
    selectedNumbersOfOptions: {
      get() {
        return this.selectedOptionCount
      },
      set(selectedNumbersOfOptions) {
        this.$emit('update:selectedOptionCount', selectedNumbersOfOptions)
      }
    },
    ...mapGetters('select', {
      getSelectedMenu: 'selectedMenuId',
      getMenuIndex: 'getMenuIndex',
      getSelectedOptions: 'getOptionsNow'
    })
  },
  created() {
    const selectedNumbersOfOptions = _.cloneDeep(this.selectedNumbersOfOptions)

    //次画面から戻ってきた場合、選択済みの値をstateから取り出し反映させる
    this.getSelectedOptions.forEach(option => {
      if (option.number) {
        selectedNumbersOfOptions[option.id] = option.number
      }
    })

    this.selectedNumbersOfOptions = selectedNumbersOfOptions
  },
  methods: {
    changeMenu(option) {
      this.selectedOptions = []
      this.selectedNumbersOfOptions = []
    },
    changeOption(selectedOptions) {
      const selectedNumbersOfOptions = _.cloneDeep(
        this.selectedNumbersOfOptions
      )

      let self = this
      selectedOptions.forEach(optionId => {
        if (!selectedNumbersOfOptions[optionId]) {
          selectedNumbersOfOptions[optionId] = 1
        }
      })
      self.selectedNumbersOfOptions.forEach((val, optionId) => {
        if (!selectedOptions.includes(optionId)) {
          //self.selectedNumbersOfOptions.splice(optionId)
          self.selectedNumbersOfOptions[optionId] = 0
          let test = 1
        }
      })

      this.selectedNumbersOfOptions = selectedNumbersOfOptions
    },
    getOptionNumberListForSelect(max, unit) {
      let ret = []
      for (let i = 1; i <= max; i++) {
        ret.push({ value: i, text: i.toString() + unit })
      }
      return ret
    },
    getOptionNumberSet(optionParam) {
      let option = _.clone(optionParam)
      if (this.selectedNumbersOfOptions[option.id]) {
        option.number = this.selectedNumbersOfOptions[option.id]
        option.price = option.price * option.number
      }
      return option
    },
    ...mapMutations('select', ['setSelectedOptions'])
  }
}
</script>
