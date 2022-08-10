import { call, put } from 'redux-saga/effects'
import { login, logout, me, register as registerApi } from '../../../api/auth'
import { updateUserProfile } from '../../../api/user'
import { CHECK_FAILURE, SIGNIN_FAILURE, SIGNIN_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS, REGISTER_SUCCESS, REGISTER_FAILURE, CHECK_SUCCESS, SIGNOUT_SUCCESS, SIGNOUT_FAILURE } from './userActionTypes'

export function* signin({ payload }) {
    try {
        const response = yield call(login, payload)
        yield put({
            type: SIGNIN_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: SIGNIN_FAILURE,
            payload: error
        })
    }
}

export function* signout() {
    try {
        const response = yield call(logout)
        yield put({
            type: SIGNOUT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: SIGNOUT_FAILURE,
            payload: error
        })
    }
}

export function* check() {
    try {
        const response = yield call(me)
        yield put({
            type: CHECK_SUCCESS,
            payload: response.data
        })
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
        yield put({
            type: UPDATE_PROFILE_SUCCESS,
            payload: response.data
        })
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
        yield put({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: REGISTER_FAILURE,
            payload: error
        })
    }
}