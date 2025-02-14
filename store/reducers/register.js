import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from "../types/register";

const INITIAL_STATE = {
    isLoading: false,
    data: {},
    message: '',
    loggedIn: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_START:
            return { ...state, isLoading: true, message: '' }
        case REGISTER_SUCCESS:
            return { ...state, data: action.payload, isLoading: false, loggedIn: true }
        case REGISTER_ERROR:
            return { ...state, message: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default reducer;