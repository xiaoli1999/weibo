import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        UserInfo: {},
        UserList: []
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
        addUser (state, user) {
            state.UserList.push(user)
        }
    },
    plugins: [createPersistedState({
        paths: ['UserInfo', 'UserList']
    })]
})
