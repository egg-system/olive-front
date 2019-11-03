import _ from 'lodash'

const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1
const MIMITSUBO_OPTION_ID = 7
const DEFAULT_OPTIONS_LIST = [[]]
const DEFAULT_MIMITSUBO_COUNT_LIST = [0]

/* state */
export const state = () => ({
  // momentを格納
  dateTime: null,
  storeId: null,
  // 二つのメニュー選択可能にするための実装
  menus: [{ storeId: null, menu: null }],
  menuIndex: FIRST_MENU_INDEX,
  // menuごとのoptions
  // optionsList[menuIndex][index] === option
  optionsList: DEFAULT_OPTIONS_LIST,
  // menuごとのmimitsuboCount
  // mimitsuboCountList[menuIndex] === mimitsuboCount
  mimitsuboCountList: DEFAULT_MIMITSUBO_COUNT_LIST
})

/* mutations */
export const mutations = {
  setSelectedDateTime(state, dateTime) {
    state.dateTime = dateTime
  },
  setStoreMenu(state, selectedStoreMenu) {
    const menus = _.cloneDeep(state.menus)
    menus[state.menuIndex].menu = selectedStoreMenu.menu
    menus[state.menuIndex].storeId = selectedStoreMenu.storeId
    state.menus = menus
    state.storeId = selectedStoreMenu.storeId

    // 耳つぼジュエリの個数、オプションの選択を初期化する
    const optionsList = _.cloneDeep(state.optionsList)
    optionsList[state.menuIndex] = []
    const mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    mimitsuboCountList[state.menuIndex] = 0
    state.optionsList = optionsList
    state.mimitsuboCountList = mimitsuboCountList
  },
  setSelectedOptions(state, options) {
    const optionsList = _.cloneDeep(state.optionsList)
    optionsList[state.menuIndex] = options
    state.optionsList = optionsList
  },
  setMenuIndex(state, menuPageId) {
    let menus = _.cloneDeep(state.menus)
    while (menus.length < menuPageId) {
      menus.push({ storeId: null, menu: null })
    }
    let optionsList = _.cloneDeep(state.optionsList)
    while (optionsList.length < menuPageId) {
      optionsList.push([])
    }
    let mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    while (mimitsuboCountList.length < menuPageId) {
      mimitsuboCountList.push(0)
    }

    const menuIndex = menuPageId - 1
    state.menus = menus.filter((select, index) => index <= menuIndex)
    state.optionsList = optionsList.filter(
      (options, index) => index <= menuIndex
    )
    state.mimitsuboCountList = mimitsuboCountList.filter(
      (mimitsuboCount, index) => index <= menuIndex
    )
    state.menuIndex = menuIndex
  },
  setMimitsuboCount(state, count) {
    const mimitsuboCountList = _.cloneDeep(state.mimitsuboCountList)
    mimitsuboCountList[state.menuIndex] = count
    state.mimitsuboCountList = mimitsuboCountList
  },
  reset(state) {
    state.menus = [{ storeId: null, menu: null }]
    state.optionsList = DEFAULT_OPTIONS_LIST
    state.mimitsuboCountList = DEFAULT_MIMITSUBO_COUNT_LIST
    state.dateTime = null
  },
  setMenus(state, { menus, storeId }) {
    if (!Array.isArray(menus)) return

    const _optionsList = []
    const _mimitsuboCountList = []
    const _menus = menus.map(_menu => {
      const _options = Array.isArray(_menu.options) ? _menu.options : []
      _optionsList.push(_options)
      const _mimitsuboCount =
        typeof _menu.mimitsuboCount === 'number' ? _menu.mimitsuboCount : 0
      _mimitsuboCountList.push(_mimitsuboCount)

      return { menu: _menu.menu, storeId }
    })
    state.menus = _menus
    state.menuIndex = menus.length === 0 ? 0 : menus.length - 1
    state.storeId = storeId
    state.optionsList =
      _optionsList.length > 0 ? _optionsList : DEFAULT_OPTIONS_LIST
    state.mimitsuboCountList =
      _mimitsuboCountList.length > 0
        ? _mimitsuboCountList
        : DEFAULT_MIMITSUBO_COUNT_LIST
  }
}

export const getters = {
  storeMenu(state) {
    return {
      storeId: state.menus[state.menuIndex].storeId,
      menu: state.menus[state.menuIndex].menu
    }
  },
  allSelectedMenuIds(state) {
    return state.menus
      .filter(select => select.menu && 'id' in select.menu)
      .map(select => select.menu.id)
  },
  allSelectedOptionIds(state) {
    return state.optionsList.flatMap(options => {
      if (!Array.isArray(options)) {
        return []
      }

      return options.filter(option => 'id' in option).map(option => option.id)
    })
  },
  isTwoMenusSelected(state) {
    if (state.menus.length === 1) {
      return false
    }

    return state.menus[SECOND_MENU_INDEX].menu !== null
  },
  isTwoHour(state, getters) {
    if (!getters.isMenuSelected) {
      return false
    }

    const firstMenuMinute = state.menus[FIRST_MENU_INDEX].menu.minutes
    if (firstMenuMinute >= 120) {
      return true
    }

    return getters.isTwoMenusSelected
  },
  isMenuSelected(state, getters) {
    if (getters.isMimitsuboOptionSelected) {
      return getters.mimitsuboCount > 0
    }

    return state.menus[FIRST_MENU_INDEX].menu !== null
  },
  isMimitsuboOptionSelected(state, getters) {
    return getters.selectedOptionIds.includes(MIMITSUBO_OPTION_ID)
  },
  isDateTimeSelected(state) {
    return state.dateTime != null
  },
  selectedMenu(state) {
    return state.menus[state.menuIndex].menu
  },
  selectedOptions(state) {
    return state.optionsList[state.menuIndex] || []
  },
  selectedOptionIds(state, getters) {
    return getters.selectedOptions.map(option => option.id)
  },
  maxMenuIndex(state) {
    return state.menus.length
  },
  mimitsuboCount(state) {
    return state.mimitsuboCountList[state.menuIndex]
  },
  reservationDetailsParameters(state) {
    const selectedMenus = state.menus.filter(select => select.menu)
    const optionsList = state.optionsList
    return selectedMenus.map((select, index) => {
      let optionIds = []
      if (Array.isArray(optionsList[index])) {
        optionIds = optionsList[index].map(option => option.id)
      }
      return {
        menu_id: select.menu.id,
        mimitsubo_count: state.mimitsuboCountList[index] || 0,
        option_ids: optionIds
      }
    })
  },
  // 選択したメニューの情報のquery
  selectedMenuParamsQuery(state) {
    const storeId = state.menus[state.menuIndex].storeId || state.storeId
    const menus = state.menus.map((_menu, index) => {
      const menuId = _.get(_menu, 'menu.id')

      const _options = state.optionsList[index]
      let optionIds = []
      if (Array.isArray(_options) && _options.length > 0) {
        optionIds = _options
          .filter(option => option.id)
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
  }
}
