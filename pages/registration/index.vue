<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-flex align-self-baseline>
          <div>オリーヴボディーケア　◯◯店</div>
        </v-flex>
        <Menu />
        <UserInfo />
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Menu from './Menu.vue'
import UserInfo from './UserInfo.vue'

export default {
  components: {
    Menu,
    UserInfo
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
