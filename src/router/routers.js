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
        component: () => import(/* webpackChunkName: "News" */'../views/News'),
        meta: {
            title: '消息'
        }
    },
    {
        path: '/news/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "Chat" */'../views/News/Chat'),
        meta: {
            title: '聊天'
        }
    },

    // TODO 个人中心模块
    {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "User" */'../views/User'),
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '/user/personal',
        name: 'personal',
        component: () => import(/* webpackChunkName: "Personal" */'../views/User/Personal'),
        meta: {
            title: '个人资料'
        }
    },
    {
        path: '/user/about',
        name: 'personal',
        component: () => import(/* webpackChunkName: "About" */'../views/User/About'),
        meta: {
            title: '关于微博'
        }
    },

    // TODO 登录注册改密模块
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */'../views/Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "Register" */'../views/Login/Register'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/password',
        name: 'password',
        component: () => import(/* webpackChunkName: "Password" */'../views/Login/Password'),
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
