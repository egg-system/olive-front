export default function({ redirect, route, query, from }) {
  // リロード時にgetパラメータが消えるため、末尾がスラッシュのurlに統一する
  if (route.path.slice(-1) === '/') {
    return
  }

  // 同一ルートではリダイレクト不可、かつルートの変更が検知できなくなるので、回避する
  if (from.name !== route.name) {
    redirect(`${route.path}/`, query)
  }
}
