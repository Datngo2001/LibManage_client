import { call, put } from 'redux-saga/effects'
import { login, me, register as registerApi } from '../../../api/auth'
import { updateUserProfile } from '../../../api/user'
import { SIGNOUT, CHECK_FAILURE, CHECK_REQUEST, SIGNIN_FAILURE, SIGNIN_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE } from './userActionTypes'

export function* signin({ payload }) {
    try {
        const response = yield call(login, payload)
        debugger
        if (response.message === 'login') {
            yield put({
                type: SIGNIN_SUCCESS,
                payload: response.data
            })
        }
    } catch (error) {
        yield put({
            type: SIGNIN_FAILURE,
            payload: error
        })
    }
}

export function* signout() {
    yield put({
        type: SIGNOUT,
    })
}

export function* check() {
    try {
        const response = yield call(me)
        if (response.status === 200) {
            yield put({
                type: CHECK_REQUEST,
                payload: response.data
            })
        }
    } catch (error) {
        yield put({
            type: CHECK_FAILURE,
            payload: error
        })
    }
}

export function* updateProfile({ payload }) {
    try {
        const response = yield call(updateUserProfile, payload)
        if (response.status === 200) {
            yield put({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data
            })
        }
    } catch (error) {
        yield put({
            type: UPDATE_PROFILE_FAILURE,
            payload: error
        })
    }
}

export function* register({ payload }) {
    try {
        const response = yield call(registerApi, payload)
        if (response.status === 200) {
            yield put({
                type: REGISTER_SUCCESS,
                payload: response.data
            })
        }
    } catch (error) {
        yield put({
            type: REGISTER_FAILURE,
            payload: error
        })
    }
}