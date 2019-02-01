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
            <td class="text-xs-right">{{ props.item.course }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-right">{{ props.item.time }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
export default {
  props: {
    isFirst: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      menu: [
        {
          name: '整体・マッサージ',
          course: '通常整体コース',
          price: '¥6,000（税抜）',
          time: '60分'
        },
        {
          name: '整体・マッサージ',
          course: '足つぼ',
          price: '¥2,000（税抜）',
          time: '0分'
        }
      ]
    }
  },
  beforeMount() {
    // 初めての場合は初診料を追加
    if (this.isFirst) {
      const firstCharged = {
        name: '整体・マッサージ',
        course: '初診料',
        price: '¥1,000（税抜）',
        time: '0分'
      }
      this.menu.push(firstCharged)
    }
  }
}
</script>

<style>
.menu {
  text-align: left;
}
.v-card__text {
  padding: 7px;
}
table.v-table tbody td:first-child {
  padding: 0px 10px;
}
</style>
