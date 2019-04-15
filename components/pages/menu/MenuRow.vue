<template>
  <v-card v-if="menuIndex == 0 || menu.minutes == 60">
    <v-card-title primary-title>
      <v-radio :value="menu.id">
        <div slot="label" class="menu-info">
          <span>{{ menu.name }}</span>
          <span class="menu-price">{{ menu.price | priceFormat }}</span>
          <span class="menu-duration">{{ menu.minutes | timeFormat }}</span>
          <div class="description">{{ menu.description }}</div>
        </div>
      </v-radio>
      <transition name="slide">
        <menu-option-slide v-if="isShownOptionSlide" :options="menu.options"/>
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
    menu: {
      type: Object,
      required: true
    }
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
  }
}
</script>
