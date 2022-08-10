import { all } from "redux-saga/effects";
import { watchToastAction } from "./reducer/toast/toastSaga";
import watchUserAction from "./reducer/user/userSaga";

export default function* rootSaga() {
    yield all([watchUserAction()])
    yield all([watchToastAction()])
}