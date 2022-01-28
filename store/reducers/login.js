import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "../types/loginTypes"

const INITIAL_STATE = {
    isLoading: false,
    data: {},
    message: '',
    loggedIn: false
}
const login = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, isLoading: true, message: '' }
        case LOGIN_SUCCESS:
            return { ...state, data: action.payload, isLoading: false, loggedIn: true }
        case LOGIN_ERROR:
            return { ...state, message: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default login;