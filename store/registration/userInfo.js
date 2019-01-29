/* state */
export const state = () => ({
  firstName: '',
  lastName: ''
})

/* mutations */
export const mutations = {
  setFirstName(state, firstName) {
    state.firstName = firstName
  },
  setLastName(state, lastName) {
    state.lastName = lastName
  }
}
