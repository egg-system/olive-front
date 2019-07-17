export default function({ redirect, route, query, from }) {
  // 再読込時にgetパラメータが消えるため、末尾がスラッシュのurlに統一する
  if (route.path.slice(-1) === '/') {
    return
  }

  if (from.name !== route.name) {
    redirect(`${route.path}/`, query)
  }
}
