export default ({ store, redirect, route }) => {
  const isLoggedIn = store.getters['login/isLogin']
  switch (route.name) {
    case 'mypage':
      if (isLoggedIn) {
        redirect('/mypage/top')
      }
      break

    default:
      if (!isLoggedIn) {
        redirect('/mypage')
      }
      break
  }
}
