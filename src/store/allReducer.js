import { combineReducers } from 'redux'
import userReducer from './reducer/user/userReducer'
import toastReducer from './reducer/toast/toastReducer'

export default combineReducers({
    user: userReducer,
    toast: toastReducer
})