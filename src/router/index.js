import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
// import { Message } from 'view-design'

Vue.use(Router)
const router = new Router({
    routes,
    mode: 'history'
})

// 解决跳转到同路由报错
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
    return routerPush.call(this, location).catch(error => error)
}

// 路由导航守卫

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title
    // const userInfo = localStorage.getItem('UserInfo')
    // console.log(userInfo)
    // if (!store.state.UserInfo.username) {
    //     if (to.name !== 'login' || to.name === 'register') return next({ name: 'login' })
    // } else {
    //     next({ name: 'home' })
    // }
    return next()
})

router.beforeResolve((to, from, next) => {
    return next()
})

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router
