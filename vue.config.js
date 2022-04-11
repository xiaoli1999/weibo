// const SentryCliPlugin = require('@sentry/webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const externals = {
    /* 调试免构建 */
    dev: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        vant: 'vant',
        axios: 'axios'
    },
    /* 上线免构建 */
    build: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        vant: 'vant',
        axios: 'axios'
    }
}
const cdn = {
    dev: {
        css: [
            'https://cdn.jsdelivr.net/npm/vant@2.12.47/lib/index.css'
        ],
        js: [
            'https://cdn.staticfile.org/vue/2.6.14/vue.runtime.min.js',
            'https://cdn.staticfile.org/vue-router/3.5.3/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
            'https://cdn.staticfile.org/axios/0.21.1/axios.min.js',
            'https://cdn.jsdelivr.net/npm/vant@2.12.47/lib/vant.min.js'
        ]
    },
    build: {
        css: [
            'https://cdn.jsdelivr.net/npm/vant@2.12.47/lib/index.css'
        ],
        js: [
            'https://cdn.staticfile.org/vue/2.6.14/vue.runtime.min.js',
            'https://cdn.staticfile.org/vue-router/3.5.3/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
            'https://cdn.staticfile.org/axios/0.21.1/axios.min.js',
            'https://cdn.jsdelivr.net/npm/vant@2.12.47/lib/vant.min.js'
        ]
    }
}

const IS_PROD = process.env.NODE_ENV === 'production'
module.exports = {
    publicPath: IS_PROD ? process.env.BASE_URL : '/',
    assetsDir: process.env.VUE_APP_VERSION,
    lintOnSave: true,
    productionSourceMap: !IS_PROD,

    devServer: {
        port: 1111,
        host: '0.0.0.0',
        open: 'Cent Browser',
        compress: true,
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_API_URL,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    // 取消api代理
                    '^/api': '/'
                }
            }
        }
    },

    parallel: require('os').cpus().length > 1,

    chainWebpack: config => {
        config.plugins.delete('prefetch')
        config.plugins.delete('preload')
        config.plugin('html').tap(args => {
            if (IS_PROD) {
                args[0].cdn = cdn.build
            } else {
                args[0].cdn = cdn.dev
            }
            return args
        })
    },

    configureWebpack: config => {
        config.externals = externals[IS_PROD ? 'build' : 'dev']
        // config.plugins.push(new BundleAnalyzerPlugin())
        if (IS_PROD) {
            config.optimization.minimize = true
            if (process.env.VUE_APP_VERSION !== 'debug') {
                /* config.plugins.push(new SentryCliPlugin({
                    include: './dist',
                    release: process.env.VUE_APP_VERSION
                })) */
            }
            config.plugins.push(
                new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    cache: true
                })
            )
        }
    }
}
