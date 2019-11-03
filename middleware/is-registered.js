export default ({ store, query, redirect }) => {
  // ユーザー情報が設定されていない場合
  if (
    !store.state.user.firstName ||
    !store.state.user.lastName ||
    !store.state.user.firstNameKana ||
    !store.state.user.lastNameKana ||
    !store.state.user.mail ||
    !store.state.user.mailConfirm ||
    !store.state.user.phoneNumber ||
    !store.state.reservation.isOk
  ) {
    // 登録画面にリダイレクトさせる
    return redirect('/registration/', { ...query })
  }
}
