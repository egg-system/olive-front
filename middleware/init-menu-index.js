export default function({ redirect, store, query }) {
  if ('menuIndex' in query) {
    store.commit('select/setMenuIndex', query.menuIndex)
    window.scrollTo(0, 0)
    return
  }

  const maxMenuIndex = store.getters['select/maxMenuIndex']
  redirect('/menus/', {
    menuIndex: maxMenuIndex,
    ...query
  })
}
