import http from '../libs/http.tools'

export function getHome (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '获取成功！' }), 2000)
    })
    // return http.get(`color/${id}`, data)
}

export function articleRelease (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '转发成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}

export function articleForward (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '转发成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}

export function articleComment (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '评论成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}

export function articleShare (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '分享成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}
