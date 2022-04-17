import http from '../libs/http.tools'

export function userLogin (data) {
    return http.post('/user-info/login', data)
}

export function userRegister (data) {
    return http.post('/user-info/addUserInfo', data)
}

export function userPassword (data) {
    return http.post('/user-info/updateUserInfo', data)
}
