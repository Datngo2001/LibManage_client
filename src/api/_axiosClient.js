import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: 'https://ute-lib-management.herokuapp.com/api/',
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true,
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