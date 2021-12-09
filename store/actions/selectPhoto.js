import {
    GET_DATA_START,
    GET_DATA_SUCCESS,
    GET_DATA_ERROR
} from "../types/firstTypes";
import * as ImagePicker from "react-native-image-picker"
import { launchImageLibrary } from 'react-native-image-picker'

export const selectPhoto = () => dispatch => {
    dispatch({ type: GET_DATA_START })

    var options = {
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose file from Custom Option'
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.launchImageLibrary(options, res => {
        // console.log('Response = ', res);
        if (res.didCancel) {
            console.log('User cancelled image picker');
        } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
        } else {
            var tmp = { "uri": res.assets[0].uri }
            dispatch({ type: GET_DATA_SUCCESS, payload: tmp })
        }
    });


}