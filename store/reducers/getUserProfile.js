import {
    GET_USER_PROFILE_START,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
} from "../types/getUserProfile";

const INITIAL_STATE = {
    isLoading: true,
    data: {},
    message: ''
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_START:
            return { ...state, isLoading: true, message: '' }
        case GET_USER_PROFILE_SUCCESS:
            return { ...state, data: action.payload, isLoading: false }
        case GET_USER_PROFILE_ERROR:
            return { ...state, message: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default reducer;