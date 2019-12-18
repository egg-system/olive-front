export default async function({ store, error, redirect, query }) {
  const { shopId, storeId, menus: menusQuery } = query
  const menusQueryArr = _parseMenusQuery(menusQuery)
  if (!storeId || !Array.isArray(menusQueryArr) || !menusQueryArr.length) {
    return redirect('/menus/', { shopId })
  }

  if (!store.getters['menu/hasSubShops']) {
    await Promise.all([
      _dispatchGetMenus(store, shopId, error),
      _dispatchGetStore(store, shopId, error)
    ])
  }

  const allMenus = store.getters['menu/allMenus']
  const menus = allMenus
    .map(menu => _createMenu(menu, menusQueryArr))
    .filter(menu => menu)

  // 値をセット
  store.commit('reservation/select/setMenus', {
    menus,
    storeId: storeId
  })
}

function _parseMenusQuery(menusQuery) {
  try {
    return JSON.parse(menusQuery)
  } catch (e) {
    return null
  }
}

async function _dispatchGetStore(store, shopId, error) {
  try {
    // queryの情報を使ってメニューを取得
    await store.dispatch('shop/getShop', { id: shopId })
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
}

async function _dispatchGetMenus(store, shopId, error) {
  try {
    // queryの情報を使ってメニューを取得
    await store.dispatch('menu/getMenus', { shopId })
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
}

function _createMenu(menu, menusQueryArr) {
  const _menu = menusQueryArr.find(
    queryMenu => parseInt(menu.id) === parseInt(queryMenu.menuId)
  )

  if (!_menu || _menu === undefined) {
    return null
  }

  const hasSlectedOption = _menu.optionIds && _menu.optionIds.length
  const _optionIds = hasSlectedOption ? _menu.optionIds.split(',') : null
  let options = []
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
