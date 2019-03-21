<template>
  <div>
    <h3>
      <p class="under">残りの回数券（回数券をお持ちの方のみ)</p>
    </h3>
    <v-layout align-center justify-center row>
      <v-flex d-flex xs12 md4>
        <v-card color="white">
          <v-card-title primary class="card-title">施術回数券</v-card-title>
          <v-card-text>残<p class="number">3</p>枚</v-card-text>
          <v-card-text>有効期限：2019/9/30</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 md4>
        <v-card color="white">
          <v-card-title primary class="card-title">インデプス回数券</v-card-title>
          <v-card-text>残<p class="number">0</p>枚</v-card-text>
          <v-card-text>有効期限：2019/9/30</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>


<style>
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
</style>
