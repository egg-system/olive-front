import _ from 'lodash'

const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1

const RESERVATION_DETAIL = {
  // 店舗をまたぐ予約を可能にさせていた名残。現状不可なので、不要なキー
  // 削除する際は、ラジオボタンにチェックが入るか確認する
  storeId: null,
  menu: null,
  options: [],
  mimitsuboCount: 0
}

/* state */
export const state = () => ({
  // momentを格納
  dateTime: null,
  storeId: null,
  // 二つのメニュー選択可能にするための実装
  menus: [_.clone(RESERVATION_DETAIL)],
  menuIndex: FIRST_MENU_INDEX
})

/* mutations */
export const mutations = {
  setSelectedDateTime(state, dateTime) {
    state.dateTime = dateTime
  },
  setStoreMenu(state, selectedStoreMenu) {
    const menus = Object.assign([], state.menus)
    menus[state.menuIndex].menu = selectedStoreMenu.menu
    menus[state.menuIndex].storeId = selectedStoreMenu.storeId

    // オプションの選択を初期化する
    menus[state.menuIndex].options = []
    menus[state.menuIndex].mimitsuboCount = 0
    state.menus = menus

    state.storeId = selectedStoreMenu.storeId
  },
  setSelectedOptions(state, options) {
    const menus = _.cloneDeep(state.menus)
    if (0 < options.filter(option => option.is_mimitsubo_jewelry).length) {
      if (menus[state.menuIndex].mimitsuboCount === 0) {
        menus[state.menuIndex].mimitsuboCount = 2
      }
    } else {
      menus[state.menuIndex].mimitsuboCount = 0
    }
    menus[state.menuIndex].options = options
    state.menus = menus
  },
  setMenuIndex(state, menuPageId) {
    let menus = _.cloneDeep(state.menus)
    while (menus.length < menuPageId) {
      menus.push(_.clone(RESERVATION_DETAIL))
    }

    const menuIndex = menuPageId - 1
    state.menus = menus.filter((select, index) => index <= menuIndex)
    state.menuIndex = menuIndex
  },
  setMimitsuboCount(state, count) {
    const menus = _.cloneDeep(state.menus)
    menus[state.menuIndex].mimitsuboCount = count
    state.menus = menus
  },
  reset(state) {
    state.menus = [_.clone(RESERVATION_DETAIL)]
    state.dateTime = null
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
    return state.menus.flatMap(select => {
      if (!select.options) {
        return []
      }

      return select.options
        .filter(option => 'id' in option)
        .map(option => option.id)
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
  isMenuSelected(state) {
    return state.menus[FIRST_MENU_INDEX].menu !== null
  },
  isDateTimeSelected(state) {
    return state.dateTime != null
  },
  selectedMenu(state) {
    return state.menus[state.menuIndex].menu
  },
  selectedOptions(state) {
    return state.menus[state.menuIndex].options
  },
  selectedOptionIds(state, getters) {
    return getters.selectedOptions.map(option => option.id)
  },
  maxMenuIndex(state) {
    return state.menus.length
  },
  mimitsuboCount(state) {
    return state.menus[state.menuIndex].mimitsuboCount
  },
  reservationDetailsParameters(state) {
    const selectedMenus = state.menus.filter(select => select.menu)
    return selectedMenus.map(select => {
      return {
        menu_id: select.menu.id,
        mimitsubo_count: select.mimitsuboCount,
        option_ids: select.options.map(option => option.id)
      }
    })
  }
}
