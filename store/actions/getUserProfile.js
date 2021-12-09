import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";
import firestore from '@react-native-firebase/firestore';

export const getUserProfile = () => dispatch => {
    dispatch({ type: GET_DATA_START })
    firestore()
        .collection('data')
        .doc("1XzVDLi8XAMURpgLoEYJ")
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                var tmp = snapshot.data()

                // console.log(tmp)

                dispatch({ type: GET_DATA_SUCCESS, payload: tmp })
            } else {
                console.log("No doc...")
            }
        })
        .catch((err) => {
            dispatch({ type: GET_DATA_ERROR, message: err })
            console.log("ERRROORR  " + err)
        })
}