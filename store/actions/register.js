import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";
import auth from '@react-native-firebase/auth';

export const register = (data) => dispatch => {
    dispatch({ type: GET_DATA_START })
    auth()
        .createUserWithEmailAndPassword(data["e-posta"], data["password"])
        .then(() => {
            console.log('User account created & signed in!');
            auth()
                .signInWithEmailAndPassword(data["e-posta"], data["password"])
                .then(() => {
                    console.log("Giriş Yapıldı")
                    dispatch({ type: GET_DATA_SUCCESS, payload: data })
                })
                .catch((e) => {
                    console.log("Hata Burda: " + e)
                })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
        });
}