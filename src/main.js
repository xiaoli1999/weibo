import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vant, { Toast } from 'vant'
import store from './store'
import './less/vant.css'

Vue.use(vant)
Vue.config.productionTip = false

Vue.prototype.$APP_VERSION = process.env.VUE_APP_VERSION
Vue.prototype.$VUE_APP_DTU_API_URL = process.env.VUE_APP_DTU_API_URL
Vue.prototype.$IS_PROD = process.env.NODE_ENV === 'production'
Vue.prototype.$checkLogin = () => {
    const isLogin = store.state.UserInfo.userId ?? false
    if (!isLogin) Toast.fail('请先登录')
    return isLogin
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
