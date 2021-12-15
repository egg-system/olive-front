const environment = process.env.NODE_ENV || 'dev'
const envSet = require(`./config/constant.${environment}.js`)

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs:{
      lang: 'ja'
    },
    title: '整体・骨盤矯正の女性専門の治療院オリーヴボディケア',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '整体・骨盤矯正の女性専門の治療院オリーヴボディケア。国家資格取得の女性スタッフによる本格施術が受けれます。お子様連れ歓迎。マッサージ、不妊、鍼もお任せ下さい'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#FFC0CB',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/common.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/filters',
    { src: '~/plugins/local-storage.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/sentry',
    [
      '@nuxtjs/google-tag-manager',
      {
        id: 'GTM-TPQJNVG',
        pageTracking: true,
        dev: environment !== 'prod'
      }
    ]
  ],
  buildModules: ['@nuxtjs/vuetify'],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  sentry: {
    dsn: envSet.doNotify
      ? 'https://8056d5ece17843d590aca2b00c36887d@sentry.io/1768480'
      : ''
  },

  /*
  ** vuetify
  */
  vuetify: {
    treeShake: true,
    defaultAssets: { icons: 'md' },
    theme: {
      themes: {
        light: {
          primary: '#4169e1',
          secondary: '#ffc0cb',
          accent: '#e50000',
          error: '#FF1744',
          warning: '#FF8F00',
          info: '#fff0f5',
          success: '#4caf50'
        }
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    hardSource: true
  },

  /*
  ** env
  */
  env: envSet,

  router: {
    middleware: [
      'validate-autenticates',
      'add-trailing-slash',
      'maintenance-redirector'
    ]
  }
}
