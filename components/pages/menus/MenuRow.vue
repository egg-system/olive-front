<template>
  <v-card v-if="menuIndex == 0 || menu.minutes == 60">
    <v-card-title>
      <v-radio :value="getShopMenuValue(menu)">
        <div slot="label" class="ml-2 my-2">
          <span>{{ menu.name }}</span>
          <span class="ml-2">{{ menu.price | priceTaxExceptFormat }}</span>
          <span class="ml-2">{{ menu.minutes | timeFormat }}</span>
          <div class="ml-2">
            {{ menu.description }}
          </div>
        </div>
      </v-radio>
      <transition name="slide">
        <menu-option-slide v-if="isShownOptionSlide" :options="options" />
      </transition>
    </v-card-title>
  </v-card>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapGetters } from 'vuex'
import MenuOptionSlide from './MenuOptionSlide.vue'

export default {
  components: { MenuOptionSlide },
  props: {
    storeId: {
      type: Number,
      required: true
    },
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return { options: [] }
  },
  computed: {
    menuIndex() {
      return this.$store.state.reservation.select.menuIndex
    },
    hasOption() {
      if (!('options' in this.menu) || this.menu.options === null) {
        return false
      }

      return this.menu.options.length > 0
    },
    isShownOptionSlide() {
      if (!this.selectedMenu) {
        return false
      }

      const isSelectedMenu = this.selectedMenu.id === this.menu.id
      return isSelectedMenu && this.hasOption
    },
    ...mapGetters('reservation/select', ['selectedMenu'])
  },
  updated() {
    // domの再利用により、optionが全チェックされてしまう
    // 上記現象を防ぐための処理
    this.options = this.menu.options
  },
  methods: {
    getShopMenuValue(menu) {
      // ラジオボックスにチェックがつかない現象を回避するため
      //  チェックの判定に、===演算子を使っているので、objectは不可
      return JSON.stringify({
        storeId: this.storeId,
        menu: menu
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
