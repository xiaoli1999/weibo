export default [
    {
        path: '/',
        name: 'home',
        redirect: '/home',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */'../views/Home'),
        meta: {
            title: '首页'
        }
    },

    // TODO 消息模块
    {
        path: '/news',
        name: 'news',
        component: () => import(/* webpackChunkName: "Home" */'../views/News'),
        meta: {
            title: '消息'
        }
    },

    // TODO 个人中心模块
    {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "Home" */'../views/User'),
        meta: {
            title: '个人中心'
        }
    },

    // TODO 登录注册改密模块
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
        path: '/password',
        name: 'password',
        component: () => import(/* webpackChunkName: "Home" */'../views/Login/Password'),
        meta: {
            title: '更改密码'
        }
    },
    {
        path: '*',
        redirect: '/home',
        meta: {}
    }
]
