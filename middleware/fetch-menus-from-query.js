import qs from 'qs'

export default async function({ store, error, route, redirect }) {
  try {
    const queryString = route.fullPath.match(/\?(.+)$/)
    if (!Array.isArray(queryString) || queryString.length <= 1) {
      redirect('/menus/')
    }
    const _query = qs.parse(queryString[1])
    if (
      !_query.storeId ||
      !Array.isArray(_query.menus) ||
      !_query.menus.length
    ) {
      redirect('/menus/')
    }

    // queryの情報を使ってメニューを取得
    await store.dispatch('menu/getMenus', { shopId: _query.shopId })
    const allMenus = store.getters['menu/allMenus']
    const menus = allMenus
      .map(menu => {
        const _menu = _query.menus.find(
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
      storeId: _query.storeId
    })
  } catch (e) {
    error({ statusCode: (e.response && e.response.status) || 500 })
  }
}
