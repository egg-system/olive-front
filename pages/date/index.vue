<style lang="scss">
td {
  padding: 5px;
}
.category-name {
  background: #d9d9d9;
}
</style>
<template>
  <section class="container">
    <div>
      <h1>{{ storeName }}</h1>
      <div class="text-xs-center">
        <h2>日時を選択してください</h2>
        <h3>選択済メニュー</h3>
        <table>
          <tr v-for="menu in selectedMenus" :key="'menu'+menu.id">
            <td class="category-name">{{ menu.categoryName }}</td>
            <td>{{ menu.menuName }}</td>
            <td>{{ menu.price }}円（税抜）</td>
            <td>{{ menu.duration }}分</td>
          </tr>
        </table>
        <p>※2時間のご予約をご希望の方</p>
        <p><input type="checkbox">2時間のご予約をご希望の方はこちらをチェックしてください。</p>
        <h3>日時選択</h3>
      </div>
    </div>
  </section>
</template>


<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  computed: {
    storeName() {
      return this.$store.state.store.name
    },
    selectedMenus() {
      var menuCategories = this.$store.state.menu.menuCategories
      var selectedMenuIds = this.$store.state.menu.selectedMenuIds
      var selectedMenus = []

      for (var menuId of selectedMenuIds) {
        for (var menuCategory of menuCategories) {
          var selectedMenu = menuCategory.menus.find(menu => menu.id === menuId)
          if (selectedMenu !== undefined) {
            selectedMenus.push({
              id: selectedMenu.id,
              categoryName: menuCategory.name,
              menuName: selectedMenu.name,
              price: selectedMenu.price_without_tax,
              duration: selectedMenu.duration_minutes
            })
          }
        }
      }
      return selectedMenus
    }
  },
  created: function() {
    var selectedMenuIds = this.$store.state.menu.selectedMenuIds
    if (selectedMenuIds.length === 0) {
      this.$router.push({ name: 'menu' })
    }
  }
}
</script>
