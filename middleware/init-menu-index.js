export default function({ redirect, store, query }) {
  if ('menuIndex' in query) {
    store.commit('reservation/select/setMenuIndex', query.menuIndex)
    window.scrollTo(0, 0)
    return
  }

  const maxMenuIndex = store.getters['reservation/select/maxMenuIndex']
  redirect('/menus/', {
    menuIndex: maxMenuIndex,
    ...query
  })
}
