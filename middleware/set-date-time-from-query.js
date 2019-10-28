import moment from 'moment'

export default async function({ store, redirect, query }) {
  const { dateTime } = query
  const dateTimeMoment = moment(decodeURIComponent(dateTime))
  if (!dateTime || !dateTimeMoment.isValid()) {
    redirect('/menus/')
  }
  store.commit('reservation/select/setSelectedDateTime', dateTimeMoment)
}
