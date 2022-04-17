import http from '../libs/http.tools'

export function getHome (data) {
    return http.get('wb-info/findHomeWeiBo', data)
}

export function articleRelease (data) {
    return http.post('wb-info/releaseWeiBo', data)
}

export function articleInfo (id) {
    return http.get('wb-info/findWeiBoById?id=' + id)
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
