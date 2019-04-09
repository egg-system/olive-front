<template>
  <div class="option-area">
    <div v-for="option in options" :key="option.id">
      <v-checkbox v-model="selectedOptions" :value="option">
        <div slot="label" class="menu-info">
          <span>{{ option.name }}</span>
          <span>{{ option.price | priceFormat }}</span>
          <span v-if="option.max_number">/&nbsp;{{ option.unit }}</span>
        </div>
      </v-checkbox>
      <!-- <v-select
        v-if="option.max_number"
        :items="getOptionNumberListForSelect(option.max_number, option.unit)"
        v-model="selectedNumbersOfOptions[option.id]"
        :disabled="!selectedOptions.includes(option.id)"
      />-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    // 耳つぼジュエリーの個数
    selectedOptionCount: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedOptions: {
      get() {
        return this.$store.getters['select/selectedOptions']
      },
      set(options) {
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
    }
  },
  created() {
    const selectedNumbersOfOptions = _.cloneDeep(this.selectedNumbersOfOptions)

    //次画面から戻ってきた場合、選択済みの値をstateから取り出し反映させる
    this.selectedOptions.forEach(option => {
      if (option.number) {
        selectedNumbersOfOptions[option.id] = option.number
      }
    })

    this.selectedNumbersOfOptions = selectedNumbersOfOptions
  },
  methods: {
    // getOptionNumberListForSelect(max, unit) {
    //   let ret = []
    //   for (let i = 1; i <= max; i++) {
    //     ret.push({ value: i, text: i.toString() + unit })
    //   }
    //   return ret
    // },
    // getOptionNumberSet(optionParam) {
    //   let option = _.clone(optionParam)
    //   if (this.selectedNumbersOfOptions[option.id]) {
    //     option.number = this.selectedNumbersOfOptions[option.id]
    //     option.price = option.price * option.number
    //   }
    //   return option
    // },
    ...mapMutations('select', ['setSelectedOptions'])
  }
}
</script>
