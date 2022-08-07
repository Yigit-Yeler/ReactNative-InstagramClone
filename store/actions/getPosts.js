import {
    GET_POST_START,
    GET_POST_SUCCESS,
    GET_POST_ERROR
} from "../types/getPosts";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { SnapshotViewIOS } from "react-native";

export const getPosts = (uid) => dispatch => {

    dispatch({ type: GET_POST_START })
    firestore()
        .collection('posts')
        .doc(uid)
        .collection("post").orderBy("date", "desc")
        .get()
        .then(querySnapshot => {
            //console.log('Total users: ', querySnapshot.size);
            //setData(querySnapshot)
            // console.log(querySnapshot.data())
            // querySnapshot.forEach(documentSnapshot => {
            //     console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            //     datas.push(documentSnapshot.data())
            // });
            var images = []
            querySnapshot.forEach((snapshot) => {
                let data = snapshot.data()
                console.log(data)
                images.push(data["img"])
            })
            dispatch({ type: GET_POST_SUCCESS, payload: images })
        });
    // const reference = storage().ref(uid + "/")
    // var images = []
    // dispatch({ type: GET_POST_START })
    // reference.listAll().then(function (result) {
    //     result.items.forEach(async (imageRef) => {
    //         // And finally display them
    //         displayImage(imageRef);
    //     })

    // }).catch(function (error) {
    //     // Handle any errors
    // });

    // function displayImage(imageRef) {
    //     imageRef.getDownloadURL().then((url) => {
    //         // TODO: Display the image on the UI
    //         images.push(url)
    //         dispatch({ type: GET_POST_SUCCESS, payload: images })
    //     }).catch(function (error) {
    //         // Handle any errors
    //     });
    // }








}