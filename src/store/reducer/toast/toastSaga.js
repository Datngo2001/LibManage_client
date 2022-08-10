import { takeLatest } from "redux-saga/effects";
import { begin, end } from "./toastActions";
import { START } from "./toastActionTypes";

export function* watchToastAction() {
    yield takeLatest(START, begin)
    yield takeLatest(START, end)
}