<template>
  <div class="menu">

    <v-layout column wrap>
      <v-flex>
        <v-card dark color="red lighten-2">
          <v-card-text><h3>選択済メニュー</h3></v-card-text>
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

  </div>

</template>

<style>
.menu {
  text-align: left;
}
.v-card__text {
  padding: 7px;
}
</style>
