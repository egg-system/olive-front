export default function({ store, query }) {
  const doCancel = 'cancel' in query ? Boolean(query.cancel) : false
  store.commit('reservation/setDoCancel', doCancel)

  const page = 'page' in query ? query.page : 1
  store.dispatch('reservation/getReservations', page)
}
