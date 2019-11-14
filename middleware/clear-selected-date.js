export default function({ store, query, redirect }) {
  if (!('dateTime' in query)) {
    return
  }

  store.commit('reservation/select/setSelectedDateTime', null)
  delete query.dateTime
  redirect('/date/', { ...query })
}
