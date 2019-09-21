export default function({ store, query, redirect }) {
  if (!store.getters['reservation/select/isMenuSelected']) {
    redirect('/menus/', { shopId: query.shopId })
  }
}
