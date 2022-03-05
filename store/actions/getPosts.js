import {
    GET_POST_START,
    GET_POST_SUCCESS,
    GET_POST_ERROR
} from "../types/getPosts";
import storage from '@react-native-firebase/storage';

export const getPosts = (uid) => dispatch => {

    const reference = storage().ref(uid + "/")
    var images = []
    dispatch({ type: GET_POST_START })
    reference.listAll().then(function (result) {
        result.items.forEach((imageRef) => {
            // And finally display them
            displayImage(imageRef);
        });
    }).catch(function (error) {
        // Handle any errors
    });

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then((url) => {
            // TODO: Display the image on the UI
            images.push(url)
            console.log(images)
            dispatch({ type: GET_POST_SUCCESS, payload: images })
        }).catch(function (error) {
            // Handle any errors
        });
    }







}