<template>
  <v-layout justify-center column>

    <v-flex v-for="data in reserveData" :key="data.id"
            d-flex
            xs12
            mad4 class="card-width">
      <v-card color="white">

        <div class="card-main">
          <v-layout row>
            <v-flex xs5 class="text-menu">
              <v-chip :color="data.status[0] === '予約中' ? 'primary' : (data.status[0] === 'キャンセル') ? 'red' : ''" label text-color="white">{{ data.status[0] }}</v-chip>
            </v-flex>
            <v-flex xs6>
              <div class="text-value shop">{{ data.status[1] }}</div>
            </v-flex>
            <v-flex v-if="!isCancelBtnHide && data.status[0] === '予約中'" xs6 >
              <v-btn class="cancel-btn" color="warning" @click="cancelConfrim">キャンセル</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5>
              <div class="text-menu">予約日時</div>
            </v-flex>
            <v-flex xs6>
              <div class="text-value">{{ data.menu[0] }}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5>
              <div class="text-menu">予約ID</div>
            </v-flex>
            <v-flex xs6>
              <div class="text-value">{{ data.menu[1] }}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5>
              <div class="text-menu">メニュー</div>
            </v-flex>
            <v-flex xs6>
              <div class="text-value">{{ data.menu[2] }}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5>
              <div class="text-menu">合計金額</div>
            </v-flex>
            <v-flex xs6>
              <div class="text-value">{{ data.menu[3] }}</div>
            </v-flex>
          </v-layout>
        </div>

      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
export default {
  props: {
    reserveData: {
      type: Array,
      default() {
        return []
      }
    },
    // リストページだけキャンセルボタンを出すため
    isCancelBtnHide: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancelConfrim() {
      this.$router.push('/mypage/list/cancel/confirm')
    }
  }
}
</script>

<style>
.v-card__title,
.v-card__text {
  color: black;
}
.number {
  display: inline;
  font-size: 30px;
}
.card-width {
  width: 90%;
  margin: 0 auto;
}
.shop {
  margin-top: 12px;
}
.text-menu {
  text-align: right;
}
.text-value {
  text-align: left;
}
.card-main {
  margin-top: 12px;
  margin-bottom: 12px;
}
.cancel-btn {
  width: 10px;
}
</style>
