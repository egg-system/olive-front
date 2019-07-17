export default async function({ store, query, redirect, route }) {
  // エステ店舗には遷移させない。たまプラーザ本店のメニュー選択画面に遷移させる
  if ('shopId' in query && query.shopId === '2') {
    redirect('/menus/', { shopId: 1, menuIndex: 1 })
    return
  }

  if (!('shopId' in query)) {
    const shopId = store.state.shop.id || 1
    redirect(route.path, {
      shopId: shopId,
      ...query
    })
  }
}
