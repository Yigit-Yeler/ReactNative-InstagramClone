import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { register } from '../store/actions/register';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
export default function Register({ navigation }) {

    const { RegisterReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    var tmpData = {
        "e-posta": "",
        "password": "",
        "rePassword": ""
    }

    const handleOnChange = (text, name) => {
        tmpData[name] = text
    }

    const handleRegister = () => {
        if (tmpData["rePassword"] == tmpData["password"]) {
            var tmpData2 = {
                "e-posta": tmpData["e-posta"],
                "password": tmpData["password"]
            }
            console.log(tmpData2)

            dispatch(register(tmpData2))

            console.log(RegisterReducer)

        }
        else {
            alert("Your passwords does not match!!!")
        }
    }


    if (RegisterReducer.loggedIn == true) {
        setTimeout(() => {
            navigation.navigate("CreateUser")
        }, 1);
    }


    return (
        <View style={styles.main}>
            <Image
                style={styles.logo}
                source={require('../assets/insta-logo.png')}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "e-posta")}
                placeholder={"Mail adresi"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "password")}
                placeholder={"Şifre"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "rePassword")}
                placeholder={"Şifre Tekrarı"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TouchableOpacity
                onPress={handleRegister}
            >
                <View style={styles.button}>
                    {
                        RegisterReducer.isLoading || RegisterReducer.loggedIn == true ?
                            (<MaterialIndicator size={20} color="white" />)
                            :
                            (<Text style={styles.text}>Kayıt Ol</Text>)
                    }

                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    logo: {
        width: wp('45%'),
        height: hp('11%'),
        marginBottom: wp('3%')
    },
    input: {
        width: wp('85%'),
        height: hp('7%'),
        color: 'white',
        backgroundColor: '#474747',
        padding: wp('3%'),
        borderRadius: 3,
        marginTop: wp('3%')
    },
    button: {
        width: wp('85%'),
        height: hp('7%'),
        backgroundColor: '#037ffc',
        marginTop: wp('3%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,

    },
    text: {
        color: 'white'
    }
})
