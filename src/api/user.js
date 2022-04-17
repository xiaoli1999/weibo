import http from '../libs/http.tools'

export function saveUserInfo (data) {
    return http.post('/user-info/updateUserInfo', data)
}
