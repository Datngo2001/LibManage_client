import { takeLatest } from "redux-saga/effects";
import { CHECK_REQUEST, REGISTER_REQUEST, SIGNIN_REQUEST, SIGNOUT_REQUEST, UPDATE_PROFILE_REQUEST } from "./userActionTypes";
import { check, register, signin, signout, updateProfile } from "./userActions";

export default function* watchUserAction() {
    yield takeLatest(SIGNIN_REQUEST, signin)
    yield takeLatest(CHECK_REQUEST, check)
    yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile)
    yield takeLatest(SIGNOUT_REQUEST, signout)
    yield takeLatest(REGISTER_REQUEST, register)
}