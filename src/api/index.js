import http from '../libs/http.tools'

export function getHome (data) {
    return http.get('wb-info/findHomeWeiBo', data)
}

export function getMyArticle (id) {
    return http.get('wb-info/findWeiBoListByUserId?id=' + id)
}

export function articleRelease (data) {
    return http.post('wb-info/releaseWeiBo', data)
}

export function articleInfo (id) {
    return http.get('wb-info/findWeiBoById?id=' + id)
}

export function attentionUser (data) {
    return http.post(`user-focus/${data.isAttention ? 'unFocus' : 'focus'}`, data)
}

export function articleShare (data) {
    return http.post('user-wb-forwarding/forwarding', data)
}

export function articlePraise (data) {
    return http.post(`user-wb-like/${data.isLike ? 'unGiveALike' : 'giveALike'}`, data)
}

export function releaseComment (data) {
    return http.post('user-wb-evaluation/releaseEvaluation', data)
}
