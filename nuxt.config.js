import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans+Condensed:wght@300&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
    //  loading: '~/components/Loading.vue',
  loading: { color: '#E1C951' },
  /*
  ** Global CSS
  */
  css: ["~/assets/style.css",
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: "~/plugins/google-maps", ssr: true }
  ],
  plugins: [
    '~/plugins/local-storage',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module',
    //'@nuxtjs/prettier',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Nuxt.js modules
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          background: '#b0bec5' ,
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      }
    }
  },
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://127.0.0.1:8000/api',
    // credentials: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },
  //nuxt auth module for authenticating users.
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token:{
          property : 'token',
          maxAge : 1800
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: '/v1/user/token/', method: 'post', propertyName: 'user' },
          // refresh: { url: '/v1/user/token/refresh', method: 'post', propertyName: false },
          logout: { url: '/v1/user/token/', method: 'delete' },
          user: { url: '/v1/user/token/', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: ''
      }
    }
  }
}

const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
      }
    }
  },
  plugins: [
    '~/plugins/bootstrap-vue',
],
}
// sometimes u cant see nuxt home page even if 
// it is running ---- change the network and port number in the package.json file 
//https://stackoverflow.com/questions/53909900/my-first-nuxt-js-app-is-refusing-to-run-on-localhost3000 
// also check https://nuxtjs.org/faq/host-port/