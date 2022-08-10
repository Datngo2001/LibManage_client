import { put } from "redux-saga/effects";
import { START, END } from "./toastActionTypes";

export function* begin({ payload }) {
    yield put({
        type: START,
        payload: payload
    })
}

export function* end() {
    yield put({
        type: END
    })
}