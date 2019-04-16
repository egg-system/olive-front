export default function({ store, redirect }) {
  if (!store.getters['select/isDateTimeSelected']) {
    redirect('/menu')
  }
}
