const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1

/* state */
export const state = () => ({
  // momentを格納
  dateTime: null,
  // 二つのメニュー選択可能にするための実装
  menus: [{ menu: null, options: [] }, { menu: null, options: [] }],
  menuIndex: FIRST_MENU_INDEX,
  mimitsuboCounts: [0, 0]
})

/* mutations */
export const mutations = {
  setSelectedDateTime(state, dateTime) {
    state.dateTime = dateTime
  },
  setSelectedMenu(state, selectedMenu) {
    const menus = Object.assign([], state.menus)
    menus[state.menuIndex].menu = selectedMenu

    // オプションの選択を初期化する
    menus[state.menuIndex].options = []
    state.menus = menus
  },
  setSelectedOptions(state, options) {
    state.menus[state.menuIndex].options = options
  },
  setForGoNextMenu(state) {
    state.menuIndex = SECOND_MENU_INDEX
  },
  setForGoBackMenu(state) {
    state.menuIndex = FIRST_MENU_INDEX
    state.menus[SECOND_MENU_INDEX].menu = null
    state.menus[SECOND_MENU_INDEX].options = []
  },
  setMimitsuboCount(state, count) {
    state.mimitsuboCounts[state.menuIndex] = count
  }
}

export const getters = {
  allSelectedMenuIds(state) {
    return state.menus
      .filter(select => select.menu && 'id' in select.menu)
      .map(select => select.menu.id)
  },
  allSelectedOptionIds(state) {
    return state.menus.flatMap(select => {
      return select.options
        .filter(option => 'id' in option)
        .map(option => option.id)
    })
  },
  isTwoMenusSelected(state) {
    return state.menus[SECOND_MENU_INDEX].menu !== null
  },
  isTwoHour(state) {
    if (state.menus[FIRST_MENU_INDEX].menu === null) {
      return false
    }

    const isSelectedSecondMenu = state.menus[SECOND_MENU_INDEX].menu !== null
    const firstMenuMinute = state.menus[FIRST_MENU_INDEX].menu.minutes

    return isSelectedSecondMenu || firstMenuMinute >= 120
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
  ifGoNextMenu(state) {
    return state.twoHoursCheck && state.menuIndex === FIRST_MENU_INDEX
  },
  getSelectedTime(state) {
    return state.time
  },
  mimitsuboCount(state) {
    return state.mimitsuboCounts[state.menuIndex]
  },
  reservationDetailsParameters(state) {
    const selectedMenus = state.menus.filter(select => select.menu)
    return selectedMenus.map((select, index) => {
      return {
        menu_id: select.menu.id,
        mimitusbo_count: state.mimitsuboCounts[index],
        option_ids: select.options.map(option => option.id)
      }
    })
  }
}
