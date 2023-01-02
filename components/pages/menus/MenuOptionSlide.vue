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
        </div>
      </v-checkbox>
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
    ...mapGetters('reservation/select', [
      'selectedOptions',
      'selectedOptionIds'
    ]),
    ...mapGetters('tax', ['isDisplayTax', 'getRate'])
  },
  methods: {
    getOptionValue(option) {
      return this.$nextTick(() => option)
    },
    isShownSelect(option) {
      return this.selectedOptionIds.includes(option.id)
    },
    ...mapMutations('reservation/select', ['setSelectedOptions'])
  }
}
</script>

<style lang="scss" scoped>
</style>
