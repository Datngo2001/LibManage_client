import { takeLatest } from "redux-saga/effects";
import { CHECK_REQUEST, REGISTER_REQUEST, SIGNIN_REQUEST, SIGNOUT, UPDATE_PROFILE_REQUEST } from "./userActionTypes";
import { check, register, signin, signout } from "./userActions";
import { updateUser } from "../../../api/user";

export default function* watchUserAction() {
    yield takeLatest(SIGNIN_REQUEST, signin)
    yield takeLatest(CHECK_REQUEST, check)
    yield takeLatest(UPDATE_PROFILE_REQUEST, updateUser)
    yield takeLatest(SIGNOUT, signout)
    yield takeLatest(REGISTER_REQUEST, register)
}