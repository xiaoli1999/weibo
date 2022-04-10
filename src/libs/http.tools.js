import axios from 'axios'

const service = axios.create({
    timeout: 60000
})

service.interceptors.response.use(
    async response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

const http = {
    /**
     * 发起GET请求
     * @param {String} url 请求路径
     * @param {Object} [config] axios的config
     * @returns {Promise<any>} 应答
     * */
    get: function (url, config = null) {
        return new Promise((resolve, reject) => {
            service.get(url.startsWith('http') ? url : '/api/' + url, config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    /**
     * 发起POST请求
     * @param {String} url 请求路径
     * @param {Object} [data] 请求数据
     * @param {Object} [config] axios的config
     * @returns {Promise<any>} 应答
     * */
    post: function (url, data = {}, config = null) {
        return new Promise((resolve, reject) => {
            service.post(url.startsWith('http') ? url : '/api/' + url, data, config)
            .then((response) => {
                if (response) {
                    resolve(response.data)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}
export default http
