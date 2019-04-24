<template>
  <div>
    <v-radio-group v-model="selectedMenuId" column>
      <section
        v-for="subShop in subShops"
        :key="subShop.id"
        :id="subShop.id"
        class="content-section"
      >
        <v-layout column wrap>
          <v-flex>
            <v-card dark color="red lighten-2">
              <v-card-text>
                <h3>{{ subShop.name }}</h3>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card>
              <v-card-title primary-title>メニュー選択</v-card-title>
            </v-card>
            <div v-for="menu in subShop.menus" :key="menu.id">
              <menu-row :menu="menu"/>
            </div>
          </v-flex>
        </v-layout>
      </section>
    </v-radio-group>

    <v-layout column>
      <v-flex xs6>
        <v-btn v-if="menuIndex == 1" @click="backToFirst">戻る</v-btn>
        <v-btn :disabled="!selectedMenu" color="warning" @click="next">空席確認・予約する</v-btn>
        <v-btn
          v-if="selectedMenu != null && selectedMenu.minutes != 120 && menuIndex == 0"
          color="warning"
          @click="twoHour"
        >２時間予約する</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import _ from 'lodash'
import MenuRow from './MenuRow.vue'

export default {
  components: { MenuRow },
  computed: {
    selectedMenuId: {
      get() {
        if (this.selectedMenu) {
          return this.selectedMenu.id
        }

        return null
      },
      set(id) {
        let menu = this.getMenu(id)
        this.setSelectedMenu(menu)
      }
    },
    ...mapState('select', ['menuIndex']),
    ...mapState('menu', ['subShops']),
    ...mapGetters('menu', ['getMenu', 'getOption']),
    ...mapGetters('select', {
      selectedOptions: 'selectedOptions',
      selectedMenu: 'selectedMenu'
    })
  },
  created() {
    this.getMenus({ shopId: 1 })
  },
  methods: {
    next() {
      this.$router.push({ name: 'date' })
    },
    twoHour() {
      this.setForGoNextMenu()
      window.scrollTo(0, 0)
    },
    backToFirst() {
      this.setForGoBackMenu()
      window.scrollTo(0, 0)
    },
    ...mapActions({
      getMenus: 'menu/getMenus'
    }),
    ...mapMutations('select', [
      'setSelectedMenu',
      'setForGoNextMenu',
      'setForGoBackMenu'
    ])
  }
}
</script>

<style lang="scss">
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
  margin: 1em;

  .option-header {
    @extend .menu-info;
    margin-bottom: 0.5em;
  }
}
</style>
