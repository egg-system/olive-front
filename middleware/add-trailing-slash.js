export default function({ redirect, route, query }) {
  // 再読込時にgetパラメータが消えるため、末尾がスラッシュのurlに統一する
  if (route.path.slice(-1) === '/') {
    return
  }

  redirect(`${route.path}/`, query)
}
