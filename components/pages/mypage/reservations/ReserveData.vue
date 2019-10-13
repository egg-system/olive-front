<template>
  <v-card color="white pa-3">
    <div class="card-main cancel">
      <v-layout row wrap>
        <v-flex xs5 class="text-menu">
          <v-chip :color="reserveStateCss" label text-color="white" disabled>{{ data.state }}</v-chip>
        </v-flex>
        <v-flex v-if="isShownCancelButton" xs6 >
          <v-btn
            v-if="isShownCancelButton"
            :disabled="canNotCancel"
            class="cancel-btn d-inline-flex"
            color="warning"
            @click="cancelConfrim(data.id)"
          >キャンセルする</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">予約店舗</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value shop">{{ data.store.name }}</div>
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
      <template v-for="(detail, index) in data.details">
        <v-layout :key="detail.id" row wrap>
          <v-flex xs5>
            <div class="text-menu">
              メニュー<span v-if="isMultiReserved">({{ (index + 1) }}時間目)</span>
            </div>
          </v-flex>
          <v-flex xs6>
            <div class="text-value">{{ detail.menu.name }}</div>
          </v-flex>
        </v-layout>
        <v-layout :key="index" row wrap>
          <v-flex xs5>
            <div class="text-menu">
              オプション<span v-if="isMultiReserved">({{ (index + 1) }}時間目)</span>
            </div>
          </v-flex>
          <v-flex xs6>
            <template v-if="detail.option_names.length === 0">
              <div class="text-value">-</div>
            </template>
            <template v-else>
              <div class="text-value">{{ detail.option_names.join(' / ') }}</div>
            </template>
          </v-flex>
        </v-layout>
      </template>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">回数券</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value">{{ data.coupons.map(coupon => coupon.name).join(' / ') }}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5>
          <div class="text-menu">合計金額</div>
        </v-flex>
        <v-flex xs6>
          <div class="text-value">{{ data.fee | priceFormat }}</div>
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

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
        case 'キャンセル済み':
          return 'red'
        default:
          return ''
      }
    },
    isMultiReserved() {
      return this.data.details.length > 1
    },
    isShownCancelButton() {
      if (this.forceHideCancel) {
        return false
      }

      return this.doCancel && this.data.state === '予約中'
    },
    canNotCancel() {
      //今日、明日の予約はキャンセルできない
      return moment(this.data.start_at).isSameOrBefore(
        moment().add(1, 'day'),
        'day'
      )
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

<style scoped>
.cancel-btn {
  width: 90%;
  min-width: 8rem;
  max-width: 10rem;
  font-size: smaller;
}
</style>
