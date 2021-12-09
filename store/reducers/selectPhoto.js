import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";

const INITIAL_STATE = {
    isLoading: true,
    data: {},
    message: ''
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DATA_START:
            return { ...state, isLoading: true, message: '' }
        case GET_DATA_SUCCESS:
            return { ...state, data: action.payload, isLoading: false }
        case GET_DATA_ERROR:
            return { ...state, message: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default reducer;