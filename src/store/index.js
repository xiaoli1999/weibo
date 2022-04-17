import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { Toast } from 'vant'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        UserInfo: {},
        Token: ''
    },
    mutations: {
        setState (state, payload) {
            const [obj, key, value] = payload
            if (payload.length === 3) {
                if (state[obj]) {
                    state[obj][key] = value
                }
            } else {
                state[obj] = key
            }
        },
        exit (state) {
            state.UserInfo = {}
            state.token = ''
            Toast('已退出')
            router.replace('/login')
        }
    },
    plugins: [createPersistedState({
        paths: ['UserInfo', 'Token']
    })]
})
