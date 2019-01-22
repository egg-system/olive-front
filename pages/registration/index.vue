<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-layout column wrap>
          <v-flex align-self-baseline>
            <div>オリーヴボディーケア　◯◯店</div>
          </v-flex>

          <v-flex align-self-baseline>
            <h2>選択済メニュー</h2>
          </v-flex>
          <v-flex>
            <v-card dark color="red lighten-2">
              <v-card-text class="menu"><h3>選択済メニュー</h3></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row align-self-baseline>
          <v-flex>
            <v-chip label>
              <v-icon left>label</v-icon>整体・マッサージ
            </v-chip>
          </v-flex>
          <v-flex>
            <div>通常整体コース</div>
          </v-flex>
          <v-flex>
            <div>¥6,000（税抜）</div>
          </v-flex>
          <v-flex>
            <div>60分</div>
          </v-flex>
        </v-layout>

        <v-layout row align-self-baseline>
          <v-flex>
            <v-chip label>
              <v-icon left>label</v-icon>整体・マッサージ
            </v-chip>
          </v-flex>
          <v-flex>
            <div>足つぼ</div>
          </v-flex>
          <v-flex>
            <div>¥2,000（税抜）</div>
          </v-flex>
          <v-flex>
            <div>0分</div>
          </v-flex>
        </v-layout>

        <v-layout column wrap>
          <v-flex>
            <v-card dark color="red lighten-2">
              <v-card-text class="menu"><h3>お客様情報</h3></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

      </v-layout>
    </v-container>
  </section>
</template>

<style>
.menu {
  text-align: left;
}
.v-card__text {
  padding: 7px;
}
</style>
