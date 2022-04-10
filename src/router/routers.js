export default [
    {
        path: '/home',
        name: 'home',
        to: '/home',
        component: () => import(/* webpackChunkName: "Home" */'../views/Home'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/news',
        name: 'news',
        to: '/news',
        component: () => import(/* webpackChunkName: "Home" */'../views/News'),
        meta: {
            title: '消息'
        }
    },
    {
        path: '/user',
        name: 'user',
        to: '/user',
        component: () => import(/* webpackChunkName: "Home" */'../views/User'),
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Home" */'../views/Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "Home" */'../views/Login/Register'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '*',
        redirect: '/home',
        meta: {}
    }
]
