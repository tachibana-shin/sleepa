SystemJS.config({
  baseURL:'https://unpkg.com/',
  defaultExtension: true,
  meta: {
      "*.scss": { "loader": "sass" },
      "*.sass": { "loader": "sass" },
    
    '*.vue': {
       'loader': 'vue-loader'
    },
  },
  map: {
        'plugin-babel': 'systemjs-plugin-babel@latest/plugin-babel.js',
    'systemjs-babel-build': 'systemjs-plugin-babel@latest/systemjs-babel-browser.js',
        
        'vue-loader': 'systemjs-vue-loader@latest',
        'vue-template-compiler': 'vue-template-compiler@latest',
        'vue-template-es2015-compiler': 'vue-template-es2015-compiler@latest',
        'vuex': 'vuex@latest',
        'vuex-cache': 'vuex-cache',
        'vuex-i18n': 'vuex-i18n',
        'vuex-persistedstate': 'vuex-persistedstate',
        'sass.js': 'sass.js@latest',
        'less': 'less@latest',
        'acorn': 'acorn@latest',
        'vue2-clock-picker': './lib/vue2-clock-picker/vue2-clock-picker.js',
        'vue2-clock-picker-plugin': './lib/vue2-clock-picker/vue2-clock-picker.plugin.js'
  },
  transpiler: 'plugin-babel',
  separateCSS: false,
  buildCSS: true,
  sassPluginOptions: {
     "autoprefixer": true
  },
  packages: {
        vue: {
            main: 'dist/vue.js'
        },
        'vue-template-es2015-compiler': {
            main: 'index.js'
        }
    }
});

SystemJS.import('./main.js')
  .catch(console.error.bind(console));