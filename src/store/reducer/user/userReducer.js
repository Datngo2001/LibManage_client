import { CHECK_FAILURE, CHECK_REQUEST, CHECK_SUCCESS, REGISTER_SUCCESS, SIGNIN_FAILURE, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNOUT, UPDATE_PROFILE_SUCCESS } from "./userActionTypes";

const init = {
    user: null,
    loading: false,
    error: null
}

export default function userReducer(state = init, { type, payload }) {
    switch (type) {
        case SIGNIN_REQUEST:
        case CHECK_REQUEST:
            return { loading: true, user: null, error: null };
        case SIGNIN_FAILURE:
        case CHECK_FAILURE:
            return { loading: false, user: null, error: payload }
        case SIGNIN_SUCCESS:
        case CHECK_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
        case REGISTER_SUCCESS:
            return { loading: false, user: payload, error: null }
        case SIGNOUT:
            return { loading: false, user: null, error: null }

        default:
            return state;
    }
}