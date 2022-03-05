import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import GetDataReducer from './reducers/getData'
import GetUserReducer from './reducers/getUserProfile'
import GetUserDataReducer from './reducers/getUserData'
import Register from './reducers/register'
import Login from './reducers/login';
import GetPostsReducer from './reducers/getPosts'
const reducers = combineReducers({
    GetDataReducer: GetDataReducer,
    GetUserReducer: GetUserReducer,
    RegisterReducer: Register,
    GetUserDataReducer: GetUserDataReducer,
    LoginReducer: Login,
    GetPostsReducer: GetPostsReducer
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;