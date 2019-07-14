export default function({ store, query, redirect }) {
  if (!store.getters['select/isDateTimeSelected']) {
    redirect('/menus/', { shopId: query.shopId })
  }
}
