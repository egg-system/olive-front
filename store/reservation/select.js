import _ from 'lodash'

const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1
const MIMITSUBO_OPTION_ID = 7
const DEFAULT_OPTIONS = []
const DEFAULT_MIMITSUBO_COUNT = 0

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
  optionsList: [DEFAULT_OPTIONS],
  // menuごとのmimitsuboCount
  // mimitsuboCountList[menuIndex] === mimitsuboCount
  mimitsuboCountList: [DEFAULT_MIMITSUBO_COUNT]
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
    const mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    mimitsuboCountList[state.menuIndex] = DEFAULT_MIMITSUBO_COUNT
    state.optionsList = optionsList
    state.mimitsuboCountList = mimitsuboCountList
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
    let mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    while (mimitsuboCountList.length < menuPageId) {
      mimitsuboCountList.push(DEFAULT_MIMITSUBO_COUNT)
    }

    state.menuList = menuList.slice(0, menuPageId)
    state.optionsList = optionsList.slice(0, menuPageId)
    state.mimitsuboCountList = mimitsuboCountList.slice(0, menuPageId)
    state.menuIndex = menuPageId - 1
  },
  setMimitsuboCount(state, count) {
    const mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    mimitsuboCountList[state.menuIndex] = count
    state.mimitsuboCountList = mimitsuboCountList
  },
  reset(state) {
    state.menuList = [null]
    state.optionsList = [DEFAULT_OPTIONS]
    state.mimitsuboCountList = [DEFAULT_MIMITSUBO_COUNT]
    state.dateTime = null
  },
  setMenus(state, { menus, storeId }) {
    if (!Array.isArray(menus)) return

    const _optionsList = []
    const _mimitsuboCountList = []
    const _menuList = menus.map(_menu => {
      const _options = Array.isArray(_menu.options)
        ? _menu.options
        : DEFAULT_OPTIONS
      _optionsList.push(_options)
      const _mimitsuboCount =
        typeof _menu.mimitsuboCount === 'number'
          ? _menu.mimitsuboCount
          : DEFAULT_MIMITSUBO_COUNT
      _mimitsuboCountList.push(_mimitsuboCount)

      return _menu.menu
    })
    state.menuList = _menuList
    state.menuIndex = menus.length === 0 ? 0 : menus.length - 1
    state.storeId = storeId
    state.optionsList =
      _optionsList.length > 0 ? _optionsList : [DEFAULT_OPTIONS]
    state.mimitsuboCountList =
      _mimitsuboCountList.length > 0
        ? _mimitsuboCountList
        : [DEFAULT_MIMITSUBO_COUNT]
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
    if (getters.isMimitsuboOptionSelected) {
      return getters.mimitsuboCount > 0
    }

    return state.menuList[FIRST_MENU_INDEX] !== null
  },
  isMimitsuboOptionSelected(state, getters) {
    return getters.selectedOptionIds.includes(MIMITSUBO_OPTION_ID)
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
  mimitsuboCount(state) {
    return state.mimitsuboCountList[state.menuIndex]
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
        mimitsubo_count: state.mimitsuboCountList[index] || 0,
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

      const mimitsuboCount = state.mimitsuboCountList[index] || 0

      return { menuId, optionIds, mimitsuboCount }
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
      const mimitsuboCount = state.mimitsuboCountList[index]
      return { menu, storeId, options, mimitsuboCount }
    })
  }
}
