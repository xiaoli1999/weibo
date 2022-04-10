/**
 * 保存数据到localStorage
 * @param {String} key 属性名
 * @param {String} value 属性值
 */
export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

/**
 * 加载数据从localStorage
 * @param {String} key 属性名
 * @returns {String}
 */
export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}

/**
 * 获取当前访问页面的主机名
 * @returns {String}
 */
export const getHost = () => {
    if (localStorage.getItem('baseURL')) {
        return localStorage.getItem('baseURL').replace('https://').replace('http://')
    }
    return window.location.host
}

/**
 * 加载自定义script
 * @param {String} src 脚本url
 * @param {Function} callback 加载完成回调
 * @returns {Promise}
 */
export const loadScript = async function (src, callback = null) {
    return new Promise((resolve, reject) => {
        const x = document.createElement('script')
        x.setAttribute('src', src)
        x.onload = () => {
            if (callback) {
                callback()
            }
            resolve()
        }
        x.onerror = (event) => {
            reject(new Error(`Failed to load ${event.target.src}`))
        }
        document.body.appendChild(x)
    })
}

/**
 * 加载自定义css
 * @param {String} src css url
 * @param {Function} callback 加载完成回调
 * @returns {Promise}
 */
export const loadCssLink = async function (src, callback = null) {
    return new Promise((resolve, reject) => {
        const x = document.createElement('link')
        x.setAttribute('href', src)
        x.setAttribute('rel', 'stylesheet')
        x.onload = () => {
            if (callback) {
                callback()
            }
            resolve()
        }
        x.onerror = (event) => {
            reject(new Error(`Failed to load ${event.target.href}`))
        }
        document.body.appendChild(x)
    })
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    if (diff === 0) {
        resStr = '刚刚'
    } else if (diff <= 59) {
        resStr = diff.toFixed(0) + '秒' + dirStr
    } else if (diff > 59 && diff <= 3599) {
        resStr = Math.floor(diff / 60) + '分钟' + dirStr
    } else if (diff > 3599 && diff <= 86399) {
        resStr = Math.floor(diff / 3600) + '小时' + dirStr
    } else if (diff > 86399 && diff <= 2623859) {
        resStr = Math.floor(diff / 86400) + '天' + dirStr
    } else if (diff > 2623859 && diff <= 31535999) {
        resStr = Math.floor(diff / 2623860) + '个月' + dirStr
    } else if (diff > 31535999) {
        resStr = Math.floor(diff / 31536000) + '年' + dirStr
    }
    return resStr
}
/**
 * @param {String|Number|Object} time 时间
 * @returns {String} 相对时间
 */
export const natureTime = time => {
    if (!time) {
        return time
    }
    if (typeof time === 'string') {
        return getRelativeTime(new Date(time).getTime())
    } else if (typeof time === 'object') {
        return getRelativeTime(time.getTime())
    } else {
        return getRelativeTime(time)
    }
}

export const RandomRange = (min, max) => {
    let returnStr = ''
    const range = (max ? Math.round(Math.random() * (max - min)) + min : min)
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    for (let i = 0; i < range; i++) {
        const index = Math.round(Math.random() * (arr.length - 1))
        returnStr += arr[index]
    }
    return returnStr
}

/**
 * @deprecated 获取随机16进制颜色
 * @returns {String} 返回颜色
 */
export const randomColor = () => {
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
    }
    return color
}
