import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIndicator } from 'react-native-indicators';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../store/actions/getUserProfile';
import { getUserData } from '../store/actions/getUserData';
import insertDataFirestore from '../coreFb/insertDataFirestore';

export default function Register({ navigation }) {
    const [isLoading, setIsLoading] = useState(0)
    const [userId, setUserId] = useState()

    const { GetUserReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    var tmpData = {
        "username": "",
        "name": "",
        "surname": "",
        "bio": ""
    }

    useEffect(() => {
        dispatch(getUserProfile())
        console.log(GetUserReducer.data.uid)
        // setUserId(getCurrentUserId())
        // console.log(userId)
    }, [])

    const handleOnChange = (text, name) => {
        tmpData[name] = text
    }

    const handleRegister = () => {
        setIsLoading(1)
        insertDataFirestore("data", GetUserReducer.data.uid, tmpData, navigation)
    }

    return (
        <View style={styles.main}>
            <Image
                style={styles.logo}
                source={require('../assets/insta-logo.png')}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "username")}
                placeholder={"Kullanıcı adınız"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "name")}
                placeholder={"İsminiz"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "surname")}
                placeholder={"Soy isminiz"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => handleOnChange(text, "bio")}
                placeholder={"Biyografiniz"}
                placeholderTextColor="lightgrey"
                style={styles.input}
            />
            <TouchableOpacity
                onPress={handleRegister}
            >
                <View style={styles.button}>
                    {
                        isLoading == 1 ?
                            (<MaterialIndicator size={20} color="white" />)
                            :
                            (<Text style={styles.text}>Bilgileri kaydet</Text>)
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
