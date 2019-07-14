export default function({ app, route, query }) {
  // 再読込時にgetパラメータが消えるため、末尾がスラッシュのurlに統一する
  console.log(route.path)
  if (route.path.slice(-1) === '/') {
    return
  }

  app.router.replace({ path: `${route.path}/`, query })
}
