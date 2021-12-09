import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";
import firestore from '@react-native-firebase/firestore';

export const getDatas = () => dispatch => {
    dispatch({ type: GET_DATA_START })
    firestore()
        .collection('data')
        .get()
        .then(querySnapshot => {
            //console.log('Total users: ', querySnapshot.size);
            //setData(querySnapshot)
            var datas = []
            querySnapshot.forEach(documentSnapshot => {
                //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                datas.push(documentSnapshot.data())
            });
            dispatch({ type: GET_DATA_SUCCESS, payload: datas })
        });

}