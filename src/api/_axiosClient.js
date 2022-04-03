import axios from 'axios'
import queryString from 'query-string'

console.log(process.env.BASEURL)
const axiosClient = axios.create({
    baseURL: 'https://ute-lib-management.herokuapp.com/',
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((res) => {
    if (res && res.data) {
        return res.data
    }

    return res
}, (error) => {
    throw error
})

export default axiosClient;