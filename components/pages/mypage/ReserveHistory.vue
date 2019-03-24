<template>
  <v-layout justify-center column>

    <v-flex d-flex xs12 mad4 class="card-width">
      <v-card color="white">
        <v-card-title primary>
          <v-chip label color="primary" text-color="white">予約中</v-chip>
          <div class="shop">◯◯◯店</div>
        </v-card-title>

        <v-layout row wrap>
          <v-flex xs5>
            <div class="text-menu">予約日時</div>
          </v-flex>
          <v-flex xs6>
            <div class="text-value">2019/03/01 10:00</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <div class="text-menu">予約ID</div>
          </v-flex>
          <v-flex xs6>
            <div class="text-value">3456789012</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <div class="text-menu">メニュー</div>
          </v-flex>
          <v-flex xs6>
            <div class="text-value">通常整体コース　60分</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs5>
            <div class="text-menu">合計金額</div>
          </v-flex>
          <v-flex xs6>
            <div class="text-value">¥6,000(税抜)</div>
          </v-flex>
        </v-layout>

      </v-card>
    </v-flex>

    <v-flex d-flex xs12 md4 class="card-width">
      <v-card color="white">
        <v-card-title primary>
          <v-chip label color="red" text-color="white">キャンセル</v-chip>
        </v-card-title>
        <v-card-text>予約日時</v-card-text>
        <v-card-text>予約ID</v-card-text>
      </v-card>
    </v-flex>

    <v-flex d-flex xs12 md4 class="card-width">
      <v-card color="white">
        <v-card-title primary>
          <v-chip label text-color="white">来店済</v-chip>
        </v-card-title>
        <v-card-text>予約日時</v-card-text>
        <v-card-text>予約ID</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

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
  margin-left: 30px;
}
.text-menu {
  text-align: right;
}
.text-value {
  text-align: left;
}
</style>
