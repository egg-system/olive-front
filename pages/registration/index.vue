<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex align-self-baseline>
          <div>オリーヴボディーケア　◯◯店</div>
        </v-flex>

        <Menu />

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

<script>
import Menu from './Menu.vue'

export default {
  components: {
    Menu
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
</style>
