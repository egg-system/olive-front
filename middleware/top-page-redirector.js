export default function({ redirect }) {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  redirect('/menus/')
}
