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
  <section v-if="0 < subStores.length" class="container">
    <v-container grid-list-xl>
      <v-layout column wrap class="menu-contents">
        <shop-name />
        <v-radio-group v-model="selectedMenu" column>
          <section v-for="subStore in subStores" :key="'menuHead'+subStore.id" :id="'menuHead'+subStore.id" class="content-section">
            <v-layout column wrap>
              <v-flex>
                <v-card dark color="red lighten-2">
                  <v-card-text><h3>{{ subStore.name }}</h3></v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card v-for="menu in subStore.menus" :key="'menu'+menu.id">
                  <v-card-title primary-title>
                    <v-radio :value="menu.id" @change="selectedOptions = []">
                      <div slot="label" class="menu-info">
                        <span>{{ menu.name }}</span>
                        <span class="menu-price">{{ menu.price_without_tax }}円（税抜き）</span>
                        <span class="menu-duration">{{ menu.duration_minutes }}分</span>
                        <div class="description">{{ menu.description }}</div>
                      </div>
                    </v-radio>
                    <transition name="slide">
                      <div v-if="menu.options != null && 0 < menu.options.length && selectedMenu==menu.id" :key="'option-area'+menu.id" class="option-area">
                        <v-checkbox v-for="option in menu.options" v-model="selectedOptions" :key="'option'+option.id"
                                    :value="option.id" :label="option.name"/>
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
    return { selectedMenu: 0, selectedOptions: [] }
  },
  computed: {
    subStores() {
      return this.$store.state.menu.subStores
    },
    ...mapGetters({ getMenu: 'menu/getMenu', getOption: 'menu/getOption' })
  },
  created: function() {
    this.getStore({ storeId: 1 })
    this.getMenus({ storeId: 1 })
    var selectedMenu = this.$store.state.select.selectedMenu
    var selectedOptions = this.$store.state.select.selectedOptions
    if (selectedMenu !== null) {
      this.selectedMenu = selectedMenu.id
    }
    selectedOptions.forEach(option => {
      this.selectedOptions.push(option.id)
    })
  },
  methods: {
    goNext: function() {
      var menu = this.getMenu(this.selectedMenu)
      var options = []
      this.selectedOptions.forEach(optionId => {
        var option = this.getOption(optionId)
        options.push(option)
      })
      this.setSelectedMenu({ selectedMenu: menu, selectedOptions: options })
      this.$router.push({ name: 'date' })
    },
    ...mapActions({
      getStore: 'store/getStore',
      getMenus: 'menu/getMenus',
      setSelectedMenu: 'select/setSelectedMenu'
    })
  }
}
</script>
