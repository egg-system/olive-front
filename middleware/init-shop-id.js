export default function({ store, query }) {
  const shopId = 'shopId' in query ? query.shopId : 1
  store.dispatch('shop/getShop', { id: shopId })
}
