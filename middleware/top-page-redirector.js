export default function({ env, redirect }) {
  if (!env.isProd) {
    return
  }

  redirect('/menus/')
}
