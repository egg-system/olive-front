export default function({ store, query, redirect }) {
  if (!store.getters['reservation/select/isMenuSelected']) {
    redirect('/menus/', { shopId: query.shopId })
  }

  if (!store.getters['reservation/select/isDateTimeSelected']) {
    redirect('/date/', { shopId: query.shopId, menus: query.menus })
  }

  if ('menus' in query || 'storeId' in query || 'dateTime' in query) {
    redirect('/complete/', { shopId: query.shopId })
  }
}
