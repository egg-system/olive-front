const FIRST_MENU_INDEX = 0
const SECOND_MENU_INDEX = 1

/* state */
export const state = () => ({
  time: null,
  // 二つのメニュー選択可能にするための実装
  menus: [{ menu: null, options: [] }, { menu: null, options: [] }],
  menuIndex: FIRST_MENU_INDEX
})

/* mutations */
export const mutations = {
  setSelectedTime(state, time) {
    state.time = time
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
  setTwoHoursCheck(state, val) {
    state.twoHoursCheck = val
  },
  setForGoNextMenu(state) {
    state.menuIndex = SECOND_MENU_INDEX
  },
  setForGoBackMenu(state) {
    state.menuIndex = FIRST_MENU_INDEX
    state.menus[SECOND_MENU_INDEX].menu = null
    state.menus[SECOND_MENU_INDEX].options = []
  }
}

export const getters = {
  isTwoMenusSelected(state) {
    return state.menus[SECOND_MENU_INDEX].menu !== null
  },
  isTwoHour(state) {
    if (state.menus[FIRST_MENU_INDEX].menu === null) {
      return false
    }

    const isSelectedSecondMenu = state.menus[SECOND_MENU_INDEX].menu !== null
    const firstMenuMinute = state.menus[FIRST_MENU_INDEX].menu.minutes

    return isSelectedSecondMenu || firstMenuMinute === 120
  },
  isMenuSelected(state) {
    return state.menus[FIRST_MENU_INDEX].menu != null
  },
  isTimeSelected(state) {
    return state.time != null
  },
  selectedMenu(state) {
    return state.menus[state.menuIndex].menu
  },
  selectedOptions(state) {
    return state.menus[state.menuIndex].options
  },
  ifGoNextMenu(state) {
    return state.twoHoursCheck && state.menuIndex === FIRST_MENU_INDEX
  },
  getSelectedTime(state) {
    return state.time
  }
}

export const actions = {
  setDefaultSelectMenu(context) {
    const defaultMenu = context.rootGetters['menu/defaultMenu']
    if (!defaultMenu) {
      return
    }
    context.commit('setSelectedMenu', defaultMenu)
  }
}
