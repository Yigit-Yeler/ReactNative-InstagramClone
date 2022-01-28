import {
    GET_USER_PROFILE_START,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
} from "../types/getUserProfile";
import auth from '@react-native-firebase/auth';

export const getUserProfile = () => dispatch => {
    dispatch({ type: GET_USER_PROFILE_START })

    auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in. 
            dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: user })
        }
        else {
            // No user is signed in.
            dispatch({ type: GET_USER_PROFILE_ERROR, message: "Giriş Yapılı değil" })
        }
    });

    // firestore()
    //     .collection('data')
    //     .doc("1XzVDLi8XAMURpgLoEYJ")
    //     .get()
    //     .then((snapshot) => {
    //         if (snapshot.exists) {
    //             var tmp = snapshot.data()

    //             // console.log(tmp)

    //             dispatch({ type: GET_DATA_SUCCESS, payload: tmp })
    //         } else {
    //             console.log("No doc...")
    //         }
    //     })
    //     .catch((err) => {
    //         dispatch({ type: GET_DATA_ERROR, message: err })
    //         console.log("ERRROORR  " + err)
    //     })
}