import http from '../libs/http.tools'

export function saveUserInfo (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200, msg: '保存成功！' }), 2000)
    })
    // return http.post(`color/${id}`, data)
}
