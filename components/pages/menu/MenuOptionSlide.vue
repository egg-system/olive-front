<template>
  <div class="option-area">
    <div v-for="option in options" :key="option.id">
      <v-checkbox v-model="checkedOptions" :value="option">
        <div slot="label" class="menu-info">
          <span>{{ option.name }}</span>
          <span>{{ option.price | priceFormat }}</span>
          <span v-if="option.is_mimitsubo_jewelry">/&nbsp; 粒</span>
        </div>
      </v-checkbox>
      <v-select
        v-if="isShownSelect(option)"
        :items="mimitsuboJewelrySelectItems"
        v-model="selectedMimitsuboCount"
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
    mimitsuboJewelrySelectItems() {
      return Array.from(Array(5).keys()).map((value, index) => {
        // 2粒から選択可能
        const count = (index + 1) * 2
        const price = 500 * count
        return {
          text: `${count}粒 ${price}円`,
          value: count
        }
      })
    },
    ...mapGetters('select', [
      'selectedOptions',
      'selectedOptionIds',
      'mimitsuboCount'
    ])
  },
  methods: {
    isShownSelect(option) {
      if (!option.is_mimitsubo_jewelry) {
        return false
      }

      return this.selectedOptionIds.includes(option.id)
    },
    ...mapMutations('select', ['setSelectedOptions', 'setMimitsuboCount'])
  }
}
</script>
