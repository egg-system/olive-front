export default function({ store, query, redirect }) {
  if (!store.getters['select/isMenuSelected']) {
    redirect('/menus/', { shopId: query.shopId })
  }
}
