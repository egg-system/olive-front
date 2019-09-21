<template>
  <div class="menu">
    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text>
            <h3>予約内容</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="time" row>
      <v-flex>
        <v-card-text>予約日時</v-card-text>
      </v-flex>
      <v-flex>
        <v-card-text>{{ time }}</v-card-text>
      </v-flex>
    </v-layout>

    <v-layout v-if="menusForDisplay" row>
      <v-flex>
        <v-data-table
          :items="menusForDisplay"
          :class="{ 'reservation_confirm': isConfirm }"
          hide-actions
          hide-headers
          class="elevation-1"
          item-key="index"
        >
          <template slot="items" slot-scope="props">
            <td v-if="props.item">{{ props.item.name }}</td>
            <td v-if="props.item" class="text-xs-right">{{ props.item.price | priceFormat }}</td>
            <td v-if="props.item" class="text-xs-right">{{ props.item.minutes | timeFormat }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-layout v-if="isConfirm" row class="cancel_term">
      <v-flex>
        <v-card-text class="txt_12em">マイページからキャンセル可能期限</v-card-text>
      </v-flex>
      <v-flex v-if="canCancel">
        <v-card-text>{{ cancelableDate | dateTimeAndDatFormat }}</v-card-text>
      </v-flex>
      <v-flex v-else>
        <v-card-text>キャンセル不可</v-card-text>
      </v-flex>
    </v-layout>
    <v-card-text v-if="isConfirm">※それ以降のキャンセルは直接サロンへご連絡ください。</v-card-text>
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
      let menus =
        0 < this.menus.length &&
        (this.ifShowOnlyFirstMenu || !this.isTwoMenusSelected)
          ? [this.menus[0]]
          : this.menus

      //表示用に加工した配列にする
      menus = menus
        .map((menuOfHour, index) => {
          let forDisplay = []
          let menu = _.clone(menuOfHour.menu)
          if (this.isTwoMenusSelected) {
            menu.name = (index + 1).toString() + '時間目 - ' + menu.name
          }
          forDisplay.push(menu)
          menuOfHour.options.forEach(optionOriginal => {
            let option = _.clone(optionOriginal)
            if (option.is_mimitsubo_jewelry) {
              option.name =
                option.name +
                ' × ' +
                menuOfHour.mimitsuboCount.toString() +
                '粒'
            }
            forDisplay.push(option)
          })
          return forDisplay
        })
        .flat()

      // 初めての場合は確認ページで初診料を追加
      if (this.isFirst && this.isConfirm) {
        menus.push({ name: '初診料', price: 1000, minutes: 0 })
      }

      // 回数券は減算処理
      if (this.coupons.length && this.isConfirm) {
        menus.push({ name: '回数券', price: -6000, minutes: 0 })
      }

      // 確認ページでは合計を表示
      if (this.isConfirm) {
        let totalPrice = 0
        let totalTime = 0
        menus.forEach(obj => {
          totalPrice += obj.price
          totalTime += obj.minutes
        })
        const total = {
          name: '合計',
          price: totalPrice,
          minutes: totalTime
        }
        menus.push(total)
      }
      return menus.map((menu, index) => ({ ...menu, index }))
    },
    time() {
      if (!this.dateTime) {
        return
      }

      return (
        this.dateTime.format('YYYY年MM月DD日 (') +
        this.$root.$options.filters.dayFormat(
          this.dateTime.format('YYYYMMDD')
        ) +
        ') ' +
        this.dateTime.format('HH:mm') +
        ' ～ ' +
        this.dateTime
          .clone()
          .add(this.allServiceMinutes, 'minutes')
          .format('HH:mm')
      )
    },
    ...mapState('registration', ['coupons', 'isFirst']),
    ...mapState('reservation/select', ['dateTime', 'menus']),
    ...mapGetters('reservation/select', ['isTwoMenusSelected'])
  }
}
</script>

<style scoped>
.menu {
  text-align: left;
}
table.v-table tbody td:first-child {
  padding: 0px 10px;
}
.reservation_confirm table.v-table tr:last-of-type {
  border-top: 2px solid;
}

.cancel_term {
  display: block;
}
.cancel_term .flex {
  padding: 0 !important;
  margin-left: 1em;
}
.cancel_term .flex .v-card__text {
  text-align: left;
}
.cancel_term .flex + .flex .v-card__text {
  margin-left: 1em;
}
.cancel_term + .v-card__text {
  text-align: left;
  margin-left: 1em;
}
.txt_12em {
  font-size: 1.2em;
}
.v-btn__content {
  font-size: 1em;
}
table.v-table thead td:not(:nth-child(1)),
table.v-table tbody td:not(:nth-child(1)),
table.v-table thead th:not(:nth-child(1)),
table.v-table tbody th:not(:nth-child(1)),
table.v-table thead td:first-child,
table.v-table tbody td:first-child,
table.v-table thead th:first-child,
table.v-table tbody th:first-child {
  padding: 0 0.2em !important;
}
</style>
