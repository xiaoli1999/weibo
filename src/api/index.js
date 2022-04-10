import http from '../libs/http.tools'

export function getHomeList () {
    const imgList = []
    for (let i = 1; i <= 32; i++) {
        imgList.push({ id: i, img: url })
    }
    return new Promise((resolve) => {
        setTimeout(() => resolve(imgList), 1000)
    })
    // return http.get('img')
}

export function saveHomeImg (data) {
    return { error: true, msg: '网络错误，请稍后再试!' }
    // return http.post('img/save', data)
}

export function getColor (id) {
    const color = []
    for (let i = 1; i <= 3600; i++) {
        color.push('fff')
    }
    return new Promise((resolve) => {
        setTimeout(() => resolve(color.join(',')), 1000)
    })
    // return http.get(`color/${id}`)
}

export function saveColor (data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ msg: '保存成功' }), 1000)
    })
    // return http.post('color/save', data)
}
