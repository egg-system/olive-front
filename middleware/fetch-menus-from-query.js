export default async function({ store, error, redirect, query }) {
  const { shopId, storeId, menus: _qmenus } = query
  const qmenus = _parseMenusQuery(_qmenus)
  if (!storeId || !Array.isArray(qmenus) || !qmenus.length) {
    redirect('/menus/')
  }

  try {
    // queryの情報を使ってメニューを取得
    await store.dispatch('menu/getMenus', { shopId })
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
  const allMenus = store.getters['menu/allMenus']
  const menus = allMenus
    .map(menu => _createMenuFromQuery(menu, qmenus))
    .filter(menu => menu)
  // 値をセット
  store.commit('reservation/select/setMenus', {
    menus,
    storeId: storeId
  })
}

function _parseMenusQuery(menusQuery) {
  let result
  try {
    result = JSON.parse(menusQuery)
  } catch (e) {}

  return result
}

function _createMenuFromQuery(menu, menusQuery) {
  const _menu = menusQuery.find(
    qMenu => parseInt(menu.id) === parseInt(qMenu.menuId)
  )
  if (!_menu) return null

  const _optionIds = _menu.optionIds ? _menu.optionIds.split(',') : null
  let options = null
  if (Array.isArray(menu.options) && menu.options.length > 0 && _optionIds) {
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
}
