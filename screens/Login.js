import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/login';
import { getUserData } from '../store/actions/getUserData';
import { getUserProfile } from '../store/actions/getUserProfile';
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
export default function Login({ navigation }) {

    const { LoginReducer } = useSelector(state => state)
    const { GetUserReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = () => {
        // dispatch(getUserData(GetUserReducer.data.uid))
        dispatch(login(email, password))
        setEmail("")
        setPassword("")
        dispatch(getUserProfile())

    }

    if (LoginReducer.loggedIn == true && GetUserReducer.isLoading == false) {
        setTimeout(() => {
            navigation.navigate("profile")
        }, 1);
    }
    return (
        <View style={styles.main}>
            <Image
                style={styles.logo}
                source={require('../assets/insta-logo.png')}
            />
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder={"Mail adresi"}
                placeholderTextColor="lightgrey"
                style={styles.input}
                value={email}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder={"Şifre"}
                placeholderTextColor="lightgrey"
                style={styles.input}
                value={password}
            />
            <TouchableOpacity
                onPress={handleRegister}
            >
                <View style={styles.button}>
                    {
                        LoginReducer.isLoading || LoginReducer.loggedIn == true ?
                            (<MaterialIndicator size={20} color="white" />)
                            :
                            (<Text style={styles.text}>Giriş Yap</Text>)
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
