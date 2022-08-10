import axios from 'axios'
import queryString from 'query-string'
import { START } from '../store/reducer/toast/toastActionTypes'
import store from '../store'

const axiosClient = axios.create({
    baseURL: 'https://ute-lib-api.herokuapp.com/api/',
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true,
    paramsSerializer: params => queryString.stringify(params)
})

let needToToast = [
    "put",
    "post",
    "patch",
    "delete"
]

const responseMiddleware = res => {
    if (res && res.data) {
        if (needToToast.some(n => n === res.config.method)) {
            store.dispatch({
                type: START, payload: {
                    isVisible: true,
                    type: "success",
                    message: res.data.message,
                }
            })
        }
        return res.data
    }

    return res
}

const errorMiddleware = error => {
    store.dispatch({
        type: START, payload: {
            isVisible: true,
            type: "success",
            message: error.response.data.message,
        }
    })

    return Promise.reject(error);
}

axiosClient.interceptors.response.use(responseMiddleware, errorMiddleware);

export default axiosClient;
