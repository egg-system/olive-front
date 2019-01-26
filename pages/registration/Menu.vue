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
          :headers="headers"
          :items="desserts"
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
          <template slot="footer">
            <td :colspan="headers.length">
              <strong>合計</strong>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

  </div>

</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'メニュー',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'コース', value: 'course' },
        { text: '金額', value: 'price' },
        { text: '所要時間', value: 'time' }
      ],
      desserts: [
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
