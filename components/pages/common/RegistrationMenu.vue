<template>
  <div class="menu">

    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>予約内容</h3></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="isConfirm" row>
      <v-flex>
        <v-card-text>来店日時</v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>2019年1月21日（月）18:00〜</v-card-text>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex>
        <v-data-table
          :items="menu"
          hide-actions
          hide-headers
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              {{ props.item.name }}
            </td>
            <td class="text-xs-right">{{ props.item.price | priceFormat }}</td>
            <td class="text-xs-right">{{ props.item.minutes | timeFormat }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-layout v-if="isConfirm" row>
      <v-flex>
        <v-card-text>マイページからキャンセル可能期限</v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>2019年1月18日（金）23:59</v-card-text>
      </v-flex>
    </v-layout>
    <v-card-text v-if="isConfirm">※それ以降のキャンセルは直接サロンへご連絡ください。</v-card-text>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    },
    ifShowOnlyFirstMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    menu() {
      if (!this.isMenuSelected()) {
        return []
      }
      let menus = []
      let menu = _.clone(this.$store.state.select.menus[0].menu)
      if (this.isTwoMenusSelected) {
        menu.name += ' - 1時間目'
      }
      menus.push(menu)
      this.$store.state.select.menus[0].options.forEach(option => {
        menus.push(option)
      })

      if (!this.ifShowOnlyFirstMenu && this.isTwoMenusSelected) {
        let menu = _.clone(this.$store.state.select.menus[1].menu)
        menu.name += ' - 2時間目'
        menus.push(menu)
        this.$store.state.select.menus[1].options.forEach(option => {
          menus.push(option)
        })
      }
      return menus
    },
    ...mapGetters({
      isTwoMenusSelected: 'select/isTwoMenusSelected'
    })
  },
  beforeMount() {
    //メニュー選択がまだならTOPに飛ばす。確認画面で日時選択がまだならTOPに飛ばす
    if (!this.isMenuSelected() || (this.isConfirm && !this.isTimeSelected())) {
      this.$router.push('/')
    }
    // 初めての場合は確認ページで初診料を追加
    if (this.$store.state.registration.isFirst && this.isConfirm) {
      const firstCharged = {
        name: '初診料',
        price: 1000,
        minutes: 0
      }
      this.menu.push(firstCharged)
    }
    // 確認ページでは合計を表示
    if (this.isConfirm) {
      let totalPrice = 0
      let totalTime = 0
      this.menu.forEach(obj => {
        totalPrice += obj.price
        totalTime += obj.time
      })
      const total = {
        name: '合計',
        price: totalPrice,
        minutes: totalTime
      }
      this.menu.push(total)
    }
  },
  methods: {
    ...mapGetters({
      isMenuSelected: 'select/isMenuSelected',
      isTimeSelected: 'select/isTimeSelected'
    })
  }
}
</script>

<style>
.menu {
  text-align: left;
}
table.v-table tbody td:first-child {
  padding: 0px 10px;
}
</style>
