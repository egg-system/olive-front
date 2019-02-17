<template>
  <div class="menu">

    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>選択済メニュー</h3></v-card-text>
        </v-card>
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
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.price_without_tax | priceFormat }}</td>
            <td class="text-xs-right">{{ props.item.duration_minutes | timeFormat }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
export default {
  filters: {
    priceFormat: function(val) {
      return val.toLocaleString() + '円'
    },
    timeFormat: function(val) {
      return val ? val + '分' : ''
    }
  },
  props: {
    isFirst: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    menu() {
      var menu = [this.$store.state.select.selectedMenu]
      if (this.$store.state.select.selectedOptions) {
        this.$store.state.select.selectedOptions.forEach(option => {
          menu.push(option)
        })
      }
      if (this.isFirst) {
        const firstCharged = {
          name: '初診料',
          price_without_tax: '¥1,000（税抜）',
          duration_minutes: '0分'
        }
        menu.push(firstCharged)
      }
      return menu
    }
  },
  beforeMount() {
    // 初めての場合は初診料を追加
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
