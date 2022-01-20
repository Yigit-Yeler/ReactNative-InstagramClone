import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";
import firestore from '@react-native-firebase/firestore';

export const getUserData = (userId) => dispatch => {
    dispatch({ type: GET_DATA_START })
    firestore()
        .collection('data')
        .doc(userId)
        .onSnapshot(querySnapshot => {
            //console.log('Total users: ', querySnapshot.size);
            //setData(querySnapshot)
            // console.log(querySnapshot.data())
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            //     datas.push(documentSnapshot.data())
            // });
            console.log(querySnapshot.data())
            dispatch({ type: GET_DATA_SUCCESS, payload: querySnapshot.data() })
        });
}

