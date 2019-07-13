export default async function({ store, query, redirect, route }) {
  if ('shopId' in query && !store.state.shop.id) {
    await store.dispatch('shop/getShop', { id: query.shopId })
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
