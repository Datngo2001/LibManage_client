import { START, END } from './toastActionTypes'

const init =
{
    isVisible: false,
    type: "",
    message: "",
}

export default function toastReducer(state = init, { type, payload }) {
    switch (type) {
        case START:
            return { isVisible: true, type: payload.type, message: payload.message }
        case END:
            return { isVisible: false, type: "", message: "" }
        default:
            return state;
    }
}