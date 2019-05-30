export default function({ redirect }) {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    return
  }

  redirect('/menus')
}
