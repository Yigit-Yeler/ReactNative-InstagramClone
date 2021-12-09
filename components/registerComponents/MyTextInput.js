import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { setEposta } from '../../store/actions/register';
import { setPassword } from '../../store/actions/register';

export default function MyTextInput({ placeText, name }) {


    const [data, setData] = useState({
        "e-posta": "",
        "password": ""
    });

    const handleOnChange = (text) => {
        if (name == "e-posta") {
            dispatch(setEposta(text))
        }
        else if (name == "sifre") {
            dispatch(setPassword(text))
        }


        console.log(RegisterReducer)
    }

    return (
        <TextInput
            onChangeText={(text) => handleOnChange(text)}
            placeholder={placeText}
            placeholderTextColor="lightgrey"
            style={styles.input}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: wp('85%'),
        height: hp('7%'),
        color: 'white',
        backgroundColor: '#474747',
        padding: wp('3%'),
        borderRadius: 3,
        marginTop: wp('3%')
    }
})
