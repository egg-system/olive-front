export default function({ store }) {
  if (!store.getters['login/isLogin']) {
    return
  }

  return store.dispatch('login/validateToken')
}
