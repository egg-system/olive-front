export default ({ store, redirect }) => {
  // メニューが選択されていない場合
  if (!store.getters['select/isMenuSelected']) {
    // メニュー画面にリダイレクトさせる
    return redirect('/menu')
  }

  // 日時が選択されていない場合
  if (!store.getters['select/isTimeSelected']) {
    // 日時画面にリダイレクトさせる
    return redirect('/date')
  }
}
