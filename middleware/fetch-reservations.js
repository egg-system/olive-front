export default async function({ store, query, error }) {
  try {
    const doCancel = 'cancel' in query ? Boolean(query.cancel) : false
    store.commit('reservation/setDoCancel', doCancel)

    const page = 'page' in query ? query.page : 1
    await store.dispatch('reservation/getReservations', page)
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
}
