<template>
  <v-card v-if="menuIndex == 0 || menu.minutes == 60">
    <v-card-title primary-title>
      <v-radio :value="getShopMenuValue(menu)">
        <div slot="label" class="menu-info">
          <span>{{ menu.name }}</span>
          <span class="menu-price">{{ menu.price | priceFormat }}</span>
          <span class="menu-duration">{{ menu.minutes | timeFormat }}</span>
          <div class="description">{{ menu.description }}</div>
        </div>
      </v-radio>
      <transition name="slide">
        <menu-option-slide v-if="isShownOptionSlide" :options="options"/>
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
      return this.$store.state.select.menuIndex
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
    ...mapGetters('select', ['selectedMenu'])
  },
  updated() {
    // domの再利用により、optionが全チェックされてしまう
    // 上記現象を防ぐための処理
    this.options = this.menu.options
  },
  methods: {
    getShopMenuValue(menu) {
      return {
        storeId: this.storeId,
        menu: menu
      }
    }
  }
}
</script>
