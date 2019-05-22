<template>
  <v-card color="white">
    <div class="card-main">
      <v-layout row>
        <v-flex xs5 class="text-menu">
          <v-chip :color="reserveStateCss" label text-color="white">{{ data.state }}</v-chip>
        </v-flex>
        <v-flex xs6>
          <div class="text-value shop">{{ data.store.name }}</div>
        </v-flex>
        <v-flex v-if="isShownCancelButton" xs6 >
          <v-btn class="cancel-btn" color="warning" @click="cancelConfrim(data.id)">キャンセル</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">予約日時</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value">{{ data.start_at | dateTimeAndDatFormat }}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">予約ID</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value">{{ data.id }}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">メニュー</div>
        </v-flex>
        <template v-for="(menu, index) in data.menus">
          <v-flex :key="index" xs6>
            <div class="text-value">
              <span v-if="isMultiReserved">{{ (index + 1) }}時間目</span>
              {{ menu.name }}
            </div>
          </v-flex>
        </template>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">合計金額</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value">{{ data.fee }}</div>
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    forceHideCancel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    reserveStateCss() {
      switch (this.data.state) {
        case '予約中':
          return 'primary'
        case 'キャンセル':
          return 'red'
        default:
          return ''
      }
    },
    isMultiReserved() {
      return this.data.menus.length > 1
    },
    isShownCancelButton() {
      if (this.forceHideCancel) {
        return false
      }

      return this.doCancel && this.data.state === '予約中'
    },
    ...mapState('reservation', ['doCancel'])
  },
  methods: {
    cancelConfrim(id) {
      this.$router.push({
        name: 'mypage-reservations-cancel',
        query: { id }
      })
    }
  }
}
</script>
