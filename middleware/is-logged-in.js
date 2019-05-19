export default ({ store, redirect, route }) => {
  const isLoggedIn = store.getters['login/isLogin']
  switch (route.name) {
    case 'mypage-login':
      if (isLoggedIn) {
        redirect('/mypage')
      }
      break

    default:
      if (!isLoggedIn) {
        redirect('/mypage/login')
      }
      break

  }
}
