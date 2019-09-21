export default function({ store, query, redirect }) {
  if (!store.getters['reservation/select/isDateTimeSelected']) {
    redirect('/menus/', { shopId: query.shopId })
  }
}
