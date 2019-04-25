export default function({ redirect, store, params }) {
  if ('id' in params) {
    store.commit('select/setMenuIndex', params.id)
    window.scrollTo(0, 0)
    return
  }

  const maxMenuIndex = store.getters['select/maxMenuIndex']
  redirect(`/menus/${maxMenuIndex}`)
}
