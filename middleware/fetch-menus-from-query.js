export default async function({ store, error, route, redirect, query }) {
  try {
    const { shopId, storeId, menus: _qmenus } = query
    const qmenus = JSON.parse(_qmenus)
    if (!storeId || !Array.isArray(qmenus) || !qmenus.length) {
      redirect('/menus/')
    }

    // queryの情報を使ってメニューを取得
    await store.dispatch('menu/getMenus', { shopId })
    const allMenus = store.getters['menu/allMenus']
    const menus = allMenus
      .map(menu => {
        const _menu = qmenus.find(
          qMenu => parseInt(menu.id) === parseInt(qMenu.menuId)
        )
        if (!_menu) return null

        const _optionIds = _menu.optionIds ? _menu.optionIds.split(',') : null
        let options = null
        if (
          Array.isArray(menu.options) &&
          menu.options.length > 0 &&
          _optionIds
        ) {
          options = menu.options.filter(option =>
            _optionIds.includes(String(option.id))
          )
        }
        const mimitsuboCount = _menu.mimitsuboCount || 0

        return {
          menu,
          options,
          mimitsuboCount
        }
      })
      .filter(menu => menu)
    // 値をセット
    store.commit('reservation/select/setMenus', {
      menus,
      storeId: storeId
    })
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
}
