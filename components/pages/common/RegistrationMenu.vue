<template>
  <div>
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="white--text text-center">
            <h3>予約内容</h3>
          </v-card-text>
        </v-card>

        <v-layout v-if="store" class="mt-4">
          <v-flex xs4>
            <p class="text-center">
              予約店舗
            </p>
          </v-flex>
          <v-flex xs8>
            <p>{{ store.name }}</p>
          </v-flex>
        </v-layout>

        <v-layout v-if="time">
          <v-flex xs4>
            <p class="text-center">
              予約日時
            </p>
          </v-flex>
          <v-flex xs8>
            <p>{{ time }}</p>
          </v-flex>
        </v-layout>

        <v-layout v-if="menusForDisplay">
          <v-flex>
            <v-data-table
              :items="menusForDisplay"
              :class="{ 'reservation_confirm': isConfirm }"
              hide-default-footer
              class="elevation-1"
              item-key="index"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td v-if="item" class="text-center">
                    {{ item.name }}
                  </td>
                  <td v-if="item">
                    <span v-if="isDisplayTax">
                      {{ item.price | priceTaxIncludeFormatWithZeikomi(getRate) }}
                    </span>
                    <span v-else>
                      {{ item.price | priceFormat }}
                    </span>
                  </td>
                  <td v-if="item">
                    {{ item.minutes | timeFormat }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>

        <v-layout v-if="isConfirm" column>
          <v-flex>
            <p class="mt-4">
              マイページからキャンセル可能期限
            </p>
          </v-flex>
          <v-flex v-if="canCancel">
            <p>{{ cancelableDate | dateTimeAndDatFormat }}</p>
          </v-flex>
          <v-flex v-else>
            <p>キャンセル不可</p>
          </v-flex>
        </v-layout>
        <p v-if="isConfirm">
          ※それ以降のキャンセルは直接サロンへご連絡ください。
        </p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import _ from 'lodash'
import moment from 'moment'

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
    allServiceMinutes() {
      return _.sumBy(this.menus, 'menu.minutes')
    },
    canCancel() {
      return moment().isBefore(this.cancelableDate)
    },
    cancelableDate() {
      return this.dateTime
        .clone()
        .subtract('days', 2)
        .endOf('day')
    },
    menusForDisplay() {
      const doShowOnlyFirstMenu =
        this.menus.length > 0 &&
        (this.ifShowOnlyFirstMenu || !this.isTwoMenusSelected)
      const menus = doShowOnlyFirstMenu ? [this.menus[0]] : this.menus

      const menusForDisplay =
        menus &&
        menus.filter(_menu => _menu && _menu.menu).map((_menu, index) => {
          const { menu } = _menu
          return {
            name: this.isTwoMenusSelected
              ? `${(index + 1).toString()}時間目 - ${menu.name}`
              : menu.name,
            price: menu.price,
            minutes: menu.minutes
          }
        })
      const menuOptionsForDisplay = this.getMenuOptionsForDisplay(menus)

      const additionalMenus = []
      // 初めての場合は確認ページで初診料を追加
      if (this.isFirst && this.isConfirm) {
        additionalMenus.push({ name: '初診料', price: 1000, minutes: 0 })
      }
      // 回数券は減算処理
      if (this.coupons.length && this.isConfirm) {
        additionalMenus.push({ name: '回数券', price: -6000, minutes: 0 })
      }

      const resultsMenus = menusForDisplay.concat(
        menuOptionsForDisplay,
        additionalMenus
      )

      // 確認ページでは合計を表示
      if (this.isConfirm) {
        const totalPrice = _.sumBy(resultsMenus, menu => menu.price)
        const totalTime = _.sumBy(resultsMenus, menu => menu.minutes)
        resultsMenus.push({
          name: '合計',
          price: totalPrice,
          minutes: totalTime
        })
      }
      return resultsMenus.map((menu, index) => ({ ...menu, index }))
    },
    time() {
      if (!this.dateTime || !this.dateTime.isValid()) return null

      const date = this.dateTime.format('YYYY年MM月DD日')
      const dayOfTheWeek = this.$root.$options.filters.dayFormat(
        this.dateTime.format('YYYYMMDD')
      )
      const timeFrom = this.dateTime.format('HH:mm')
      const timeTo = this.dateTime
        .clone()
        .add(this.allServiceMinutes, 'minutes')
        .format('HH:mm')

      return `${date} (${dayOfTheWeek}) ${timeFrom} ～ ${timeTo}`
    },
    store() {
      return this.selectedStore
    },
    ...mapState('user', ['coupons', 'isFirst']),
    ...mapState('reservation/select', ['dateTime']),
    ...mapGetters('reservation/select', [
      'isTwoMenusSelected',
      'selectedStore',
      'menus'
    ]),
    ...mapGetters('tax', ['isDisplayTax', 'getRate'])
  },
  methods: {
    getMenuOptionsForDisplay(menus) {
      if (!Array.isArray(menus) || !menus.length) return []
      return _(menus)
        .filter(menu => Array.isArray(menu.options) && menu.options.length > 0)
        .map(menu => {
          const { options, mimitsuboCount } = menu
          return options.map(option => {
            const name = option.is_mimitsubo_jewelry
              ? `${option.name} × ${mimitsuboCount.toString()}粒`
              : option.name
            const price = option.is_mimitsubo_jewelry
              ? parseInt(option.price, 10) * parseInt(mimitsuboCount, 10)
              : option.price
            // オプションにminutesは存在しないが、メニューと併記する都合上、0にする
            return { name, price, minutes: 0 }
          })
        })
        .flatten()
        .value()
    }
  }
}
</script>
