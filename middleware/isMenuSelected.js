export default function({ store, redirect }) {
  if (!store.getters['select/isMenuSelected']) {
    redirect('/menu')
  }
}
