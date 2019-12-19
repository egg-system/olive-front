<template>
  <div class="coupon-main">
    <v-layout align-center justify-center row>
      <v-flex d-flex xs12 md4>
        <v-card color="white">
          <v-card-title primary class="card-title">
            施術回数券
          </v-card-title>
          <v-card-text>
            残<p class="number">
              3
            </p>枚
          </v-card-text>
          <v-card-text>有効期限：2019/9/30</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md4>
        <v-card color="white">
          <v-card-title primary class="card-title">
            インデプス回数券
          </v-card-title>
          <v-card-text>
            残<p class="number">
              0
            </p>枚
          </v-card-text>
          <v-card-text>有効期限：2019/9/30</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
.v-card__title,
.v-card__text {
  color: black;
}
.card-title {
  font-size: 15px;
}
.number {
  display: inline;
  font-size: 30px;
}
.coupon-main {
  width: 90%;
  margin: 12px auto;
}
</style>
