<template>
  <div id="other-shop-list" class="mt-8">
    <v-layout justify-center>
      <v-flex xs12 sm10 md10
              lg8
              xl6
      >
        <v-card color="red lighten-2">
          <v-card-text class="text-center white--text">
            <h3>近くの院を見てみる（メニュー選択）</h3>
          </v-card-text>
        </v-card>

        <section class="text-center">
          <div class="elevation-1">
            <v-container>
              <v-row>
                <v-col
                  v-for="near_store in $store.state.shop.near_stores"
                  :key="near_store.id"
                  class="col"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-btn
                    class="text-capitalize"
                    block
                    :href="`/menus/?menuIndex=1&shopId=${near_store.near_store_id}`"
                  >
                    {{ near_store.short_name }}へ
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </section>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.col {
  text-align: center;
}
</style>
