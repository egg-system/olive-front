<template>
  <div>
    <div class="mt-4 body-1">
      ※オプションをご希望の場合は選択してください
    </div>
    <div v-for="option in options" :key="option.id">
      <v-checkbox v-if="true" v-model="checkedOptions" :value="option" class="ml-4">
        <div slot="label" class="ml-2">
          <span>{{ option.name }}</span>
          <span v-if="isDisplayTax">
            <span class="ml-2">{{ option.price | priceTaxIncludeFormat(getRate) }}</span>
          </span>
          <span v-else>
            <span class="ml-2">{{ option.price | priceTaxExceptFormat }}</span>
          </span>
          <span v-if="option.is_mimitsubo_jewelry">/&nbsp; 粒</span>
        </div>
      </v-checkbox>
      <v-select
        v-if="isShownSelect(option)"
        v-model="selectedMimitsuboCount"
        :items="mimitsuboJewelrySelectItems"
        placeholder="粒数を選択してください。"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return { loading: true }
  },
  computed: {
    checkedOptions: {
      get() {
        return this.selectedOptions
      },
      set(options) {
        this.setSelectedOptions(options)
      }
    },
    selectedMimitsuboCount: {
      get() {
        return this.mimitsuboCount
      },
      set(mimitsuboCount) {
        this.setMimitsuboCount(mimitsuboCount)
      }
    },
    ...mapGetters('reservation/select', [
      'selectedOptions',
      'selectedOptionIds',
      'mimitsuboCount'
    ]),
    ...mapGetters('tax', ['isDisplayTax', 'getRate']),
    mimitsuboJewelrySelectItems() {
      return Array.from(Array(5).keys()).map((value, index) => {
        // 2粒から選択可能
        const count = (index + 1) * 2
        const price = 500 * count
        var disp_price = price
        if (this.isDisplayTax) {
          disp_price = Math.floor(price * this.getRate)
        }
        return {
          text: `${count}粒 ${disp_price}円`,
          value: count
        }
      })
    }
  },
  methods: {
    getOptionValue(option) {
      return this.$nextTick(() => option)
    },
    isShownSelect(option) {
      if (!option.is_mimitsubo_jewelry) {
        return false
      }

      return this.selectedOptionIds.includes(option.id)
    },
    ...mapMutations('reservation/select', [
      'setSelectedOptions',
      'setMimitsuboCount'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
