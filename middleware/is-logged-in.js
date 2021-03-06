export default ({ store, redirect, route }) => {
  const isLoggedIn = store.getters['user/isLogin']
  switch (route.name) {
    case 'mypage-login':
      if (isLoggedIn) {
        redirect('/mypage/')
      }
      break

    default:
      if (!isLoggedIn) {
        redirect('/mypage/login')
      }
      break
  }
}
