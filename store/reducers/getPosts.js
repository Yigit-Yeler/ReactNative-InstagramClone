import {
    GET_POST_START,
    GET_POST_SUCCESS,
    GET_POST_ERROR
} from '../types/getPosts'

const INITIAL_STATE = {
    isLoading: true,
    datas: [],
    message: ''
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_POST_START:
            return { ...state, isLoading: true, message: '' }
        case GET_POST_SUCCESS:
            return { ...state, datas: action.payload, isLoading: false }
        case GET_POST_ERROR:
            return { ...state, message: action.payload, isLoading: false }
        default:
            return state;
    }
}

export default reducer;