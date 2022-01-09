# olive

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run local # 開発環境用

# build for production and launch server
$ npm run build:local # 開発環境用
$ npm run build:stg # ステージング環境用
$ npm run build:prod # 本番環境用
$ npm start

# generate static project
$ npm run generate:stg # ステージング環境用
$ npm run generate:prod # 本番環境用
```

## 静的ページ確認
* production
  * https://olive-fe.netlify.com/
* develop
  * https://develop--olive-fe.netlify.com/
* masterブランチにプッシュするとproduction環境でビルドされ、developブランチにプッシュするとdevelop環境でビルドされ上記ページで動作確認できます

## ドキュメント
* アプリケーションフレームワーク
  * [Vue.js](https://jp.vuejs.org/index.html)
  * [Nuxt.js](https://ja.nuxtjs.org/)
* UI/コンポーネントフレームワーク
  * [Vuetify](https://vuetifyjs.com/ja/)
* コード整形
  * [ESLint](https://eslint.org/)
  * [Prettier](https://prettier.io/)
* テスト
  * [jest](https://vue-test-utils.vuejs.org/ja/guides/testing-single-file-components-with-jest.html)
  * [vue-test-utils](https://vue-test-utils.vuejs.org/ja/)
* CI
  * [CircleCI](https://circleci.com/gh/egg-system/olive-front)
* 静的ページ確認
  * [netlify](https://www.netlify.com/)
  * [netlify app](https://app.netlify.com/)
* 開発用のAPIモック作成
  * [myjson](http://myjson.com/)

* フロントエンドAPI
  * [Swagger](https://egg-system.github.io/olive-api-docs/)
