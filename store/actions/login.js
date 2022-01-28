import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../types/loginTypes';
import auth from '@react-native-firebase/auth';

export const login = (email, password) => dispatch => {
    dispatch({ type: LOGIN_START })
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account signed in!');
            let data = {
                "email": email,
                "password": password
            }
            dispatch({ type: LOGIN_SUCCESS, payload: data })
        })
        .catch(error => {
            alert(error);
        });
}