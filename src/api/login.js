import http from '../libs/http.tools'

export function userLogin (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '登录成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}

export function userRegister (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '注册成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}

