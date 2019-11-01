export default ({ store, query, redirect }) => {
  // ユーザー情報が設定されていない場合
  if (
    !store.state.login.firstName ||
    !store.state.login.lastName ||
    !store.state.login.firstNameKana ||
    !store.state.login.lastNameKana ||
    !store.state.login.mail ||
    !store.state.login.mail2 ||
    !store.state.login.phoneNumber ||
    !store.state.reservation.registration.isOk
  ) {
    // 登録画面にリダイレクトさせる
    return redirect('/registration/', { ...query })
  }
}
