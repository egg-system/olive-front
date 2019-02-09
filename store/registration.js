/* state */
const initialState = {
  firstName: '',
  lastName: '',
  firstNameKana: '',
  lastNameKana: '',
  mail: '',
  mail2: '',
  phoneNumber: '',
  coupon: '',
  pregnancyTermSelected: '',
  childrenSelected: '',
  isFirst: true,
  message: 'yes',
  isOk: '',
  request: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setFirstName(state, firstName) {
    state.firstName = firstName
  },
  setLastName(state, lastName) {
    state.lastName = lastName
  },
  setFirstNameKana(state, firstNameKana) {
    state.firstNameKana = firstNameKana
  },
  setLastNameKana(state, lastNameKana) {
    state.lastNameKana = lastNameKana
  },
  setMail(state, mail) {
    state.mail = mail
  },
  setMail2(state, mail2) {
    state.mail2 = mail2
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },
  setCoupon(state, coupon) {
    state.coupon = coupon
  },
  setPregnancyTermSelected(state, pregnancyTermSelected) {
    state.pregnancyTermSelected = pregnancyTermSelected
  },
  setChildrenSelected(state, childrenSelected) {
    state.childrenSelected = childrenSelected
  },
  setIsFirst(state, isFirst) {
    state.isFirst = isFirst
  },
  setMessage(state, message) {
    state.message = message
  },
  setIsOk(state, isOk) {
    state.isOk = isOk
  },
  setRequest(state, request) {
    state.request = request
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}
