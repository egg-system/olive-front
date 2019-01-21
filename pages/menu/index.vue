<style lang="scss">
h2 {
  background: #f4cccd;
  display: block;
  font-size: 18px;
  padding: 5px 15px;
  text-align: left;
}

.menu-contents {
  max-width: 500px;
  width: 100%;
  section.content-section {
    margin: 20px 0;
    ul {
      padding-left: 0px;
    }
    .menu-category {
      display: inline-block;
      width: 50%;
      font-size: 18px;
      border: solid 1px #000000;
      padding: 10px 0;
    }
    .menu-item {
      border: solid 1px #000000;
      margin: 5px 0;
      padding: 10px;
      .menu-name {
        font-weight: bold;
      }
      .menu-info {
        text-align: left;
        span {
          margin-right: 10px;
        }
      }
      p {
        margin-top: 10px;
        text-align: left;
      }
    }
  }
}
</style>

<template>
  <section v-if="0 < menuCategories.length" class="container">
    <div class="menu-contents">
      <h1>{{ storeName }}</h1>
      <section class="content-section">
        <h2>メニューを選択してください</h2>
        <ul>
          <li v-for="menuCategory in menuCategories" :key="'categoryHead'+menuCategory.id" class="menu-category">
            <a :href="'#menuHead'+menuCategory.id">{{ menuCategory.name }}</a>
          </li>
        </ul>
      </section>
      <section v-for="menuCategory in menuCategories" :key="'menuHead'+menuCategory.id" :id="'menuHead'+menuCategory.id" class="content-section">
        <h2>{{ menuCategory.name }}</h2>
        <div v-for="menu in menuCategory.menus" :key="'menu'+menu.id" class="menu-item">
          <div class="menu-info">
            <span class="menu-name">{{ menu.name }}</span>
            <span class="menu-price">{{ menu.price_without_tax }}円（税抜き）</span>
            <span class="menu-duration">{{ menu.duration_minutes }}分</span>
          </div>
          <p>{{ menu.description }}</p>
          <v-btn color="success" @click="selectMenu(menu.id)">
            予約する
          </v-btn>
        </div>
      </section>
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
    menuCategories() {
      return this.$store.state.menu.menuCategories
    }
  },
  created: function() {
    this.getStore({ storeId: 1 })
    this.getMenus({ storeId: 1 })
  },
  methods: {
    selectMenu: function(menuId) {
      this.clearSelectedMenus()
      this.addSelectedMenu(menuId)
      this.$router.push({ name: 'date' })
    },
    ...mapActions({
      getStore: 'store/getStore',
      getMenus: 'menu/getMenus',
      addSelectedMenu: 'menu/addSelectedMenu',
      clearSelectedMenus: 'menu/clearSelectedMenus'
    })
  }
}
</script>
