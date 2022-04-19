import http from '../libs/http.tools'

export function getHome (data) {
    return http.get('wb-info/findHomeWeiBo', data)
}

export function getMyArticle (id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '获取成功！' }), 2000)
    })
    // TODO 预留接口api
    // return http.get('wb-info/findHomeWeiBo', id)
}

export function articleRelease (data) {
    return http.post('wb-info/releaseWeiBo', data)
}

export function articleInfo (id) {
    return http.get('wb-info/findWeiBoById?id=' + id)
}

export function attentionUser (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '已关注！' }), 200)
    })
    // return http.post(`color/${id}`, data)
}

export function articleShare (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '分享成功！' }), 200)
    })
    // return http.post(`color/${id}`, data)
}

export function articlePraise (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '点赞成功！' }), 200) // 数字 模拟接口延时
    })
    // return http.post(`color/${id}`, data)
}

// 差两个接口 获取转发者的信息， 评论列表

export function getSharetList (wbId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '获取转发列表！' }), 200)
    })
    // return http.post(`color/${id}`, wbId)
}

export function getCommentList (wbId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '获取评论列表！' }), 200)
    })
    // return http.post(`color/${id}`, wbId)
}

export function releaseComment (wbId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '评论成功！' }), 200)
    })
// return http.post(`color/${id}`, wbId)
}
