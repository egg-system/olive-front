import _ from 'lodash'

const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1
const DEFAULT_OPTIONS = []

/* state */
export const state = () => ({
  // momentを格納
  dateTime: null,
  storeId: null,
  // 二つのメニュー選択可能にするための実装
  menuList: [null],
  menuIndex: FIRST_MENU_INDEX,
  // menuごとのoptions
  // optionsList[menuIndex][index] === option
  optionsList: [DEFAULT_OPTIONS]
})

/* mutations */
export const mutations = {
  setSelectedDateTime(state, dateTime) {
    state.dateTime = dateTime
  },
  setStoreMenu(state, selectedStoreMenu) {
    const menuList = _.cloneDeep(state.menuList)
    menuList[state.menuIndex] = selectedStoreMenu.menu
    state.menuList = menuList
    state.storeId = selectedStoreMenu.storeId

    // 耳つぼジュエリの個数、オプションの選択を初期化する
    const optionsList = _.cloneDeep(state.optionsList)
    optionsList[state.menuIndex] = DEFAULT_OPTIONS
    state.optionsList = optionsList
  },
  setSelectedOptions(state, options) {
    const optionsList = _.cloneDeep(state.optionsList)
    optionsList[state.menuIndex] = options
    state.optionsList = optionsList
  },
  setMenuIndex(state, menuPageId) {
    let menuList = _.cloneDeep(state.menuList)
    while (menuList.length < menuPageId) {
      menuList.push(null)
    }
    let optionsList = _.cloneDeep(state.optionsList)
    while (optionsList.length < menuPageId) {
      optionsList.push(DEFAULT_OPTIONS)
    }

    state.menuList = menuList.slice(0, menuPageId)
    state.optionsList = optionsList.slice(0, menuPageId)
    state.menuIndex = menuPageId - 1
  },
  reset(state) {
    state.optionsList = [DEFAULT_OPTIONS]
    state.dateTime = null
  },
  setMenus(state, { menus, storeId }) {
    if (!Array.isArray(menus)) return

    const _optionsList = []
    const _menuList = menus.map(_menu => {
      const _options = Array.isArray(_menu.options)
        ? _menu.options
        : DEFAULT_OPTIONS
      _optionsList.push(_options)

      return _menu.menu
    })
    state.menuList = _menuList
    state.menuIndex = menus.length === 0 ? 0 : menus.length - 1
    state.storeId = storeId
    state.optionsList =
      _optionsList.length > 0 ? _optionsList : [DEFAULT_OPTIONS]
  }
}

export const getters = {
  storeMenu(state) {
    return {
      storeId: state.storeId,
      menu: state.menuList[state.menuIndex]
    }
  },
  allSelectedMenuIds(state) {
    return state.menuList
      .filter(menu => menu && 'id' in menu)
      .map(menu => menu.id)
  },
  allSelectedOptionIds(state) {
    return _.flatten(
      state.optionsList.map(options => {
        if (!Array.isArray(options)) {
          return []
        }

        return options.filter(option => 'id' in option).map(option => option.id)
      })
    )
  },
  isTwoMenusSelected(state) {
    if (state.menuList.length === 1) {
      return false
    }

    return state.menuList[SECOND_MENU_INDEX] !== null
  },
  isTwoHour(state, getters) {
    if (!getters.isMenuSelected) {
      return false
    }

    const firstMenuMinute = state.menuList[FIRST_MENU_INDEX].minutes
    if (firstMenuMinute >= 120) {
      return true
    }

    return getters.isTwoMenusSelected
  },
  isMenuSelected(state, getters) {
    return state.menuList[FIRST_MENU_INDEX] !== null
  },
  isDateTimeSelected(state) {
    return state.dateTime != null
  },
  selectedMenu(state) {
    return state.menuList[state.menuIndex]
  },
  selectedOptions(state) {
    return state.optionsList[state.menuIndex] || DEFAULT_OPTIONS
  },
  selectedOptionIds(state, getters) {
    return getters.selectedOptions.map(option => option.id)
  },
  selectedStore(state, getters, rootState, rootGetters) {
    return rootGetters['menu/getStore'](state.storeId) || null
  },
  maxMenuIndex(state) {
    return state.menuList.length
  },
  reservationDetailsParameters(state) {
    const selectedMenus = state.menuList.filter(menu => menu)
    const optionsList = state.optionsList
    return selectedMenus.map((menu, index) => {
      let optionIds = []
      if (Array.isArray(optionsList[index])) {
        optionIds = optionsList[index].map(option => option.id)
      }
      return {
        menu_id: menu.id,
        option_ids: optionIds
      }
    })
  },
  // 選択したメニューの情報のquery
  selectedMenuParamsQuery(state) {
    const storeId = state.storeId
    const menus = state.menuList.map((_menu, index) => {
      const menuId = _menu.id

      const _options = state.optionsList[index]
      let optionIds = []
      if (Array.isArray(_options) && _options.length > 0) {
        optionIds = _options
          .filter(option => option && option.id)
          .map(option => option.id)
          .join(',')
      }

      return { menuId, optionIds }
    })
    return {
      storeId,
      menus: JSON.stringify(menus)
    }
  },
  menus(state) {
    return state.menuList.map((menu, index) => {
      const storeId = state.storeId
      const options = state.optionsList[index]
      return { menu, storeId, options }
    })
  }
}
