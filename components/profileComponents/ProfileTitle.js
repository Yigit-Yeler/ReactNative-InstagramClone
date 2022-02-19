import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../store/actions/getUserData';
export default function ProfileTitle({ navigation }) {

    const { GetUserReducer } = useSelector(state => state)
    const { GetUserDataReducer } = useSelector(state => state)

    const [profilePhoto, setProfilePhoto] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        setProfilePhoto(GetUserReducer.data.photoURL)

        dispatch(getUserData(GetUserReducer.data.uid))
        // const willFocusSubscription = navigation.addListener('focus', () => {
        //     dispatch(getUserData(GetUserReducer.data.uid))
        // });
        // return willFocusSubscription;
    }, [])

    const updateProfile = () => {
        navigation.navigate('updateProfile')
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.profile}>
                {
                    GetUserReducer.data.photoURL != null ?
                        <Image
                            style={styles.image}
                            source={{ uri: GetUserReducer.data.photoURL }} />
                        :
                        <Image
                            style={styles.image}
                            source={require('../../assets/defaultpp.jpg')} />
                }

                <View style={styles.profileDetail}>
                    <Text style={{ fontWeight: '700', color: 'white' }}>
                        7
                    </Text>
                    <Text style={{ color: 'white' }}>
                        Gönderi
                    </Text>
                </View>
                <View style={styles.profileDetail}>
                    <Text style={{ fontWeight: '700', color: 'white' }}>
                        121
                    </Text>
                    <Text style={{ color: 'white' }}>
                        Takipçi
                    </Text>
                </View>
                <View style={styles.profileDetail}>
                    <Text style={{ fontWeight: '700', color: 'white' }}>
                        394
                    </Text>
                    <Text style={{ color: 'white' }}>
                        Takip
                    </Text>
                </View>
            </View>
            <View style={styles.introduction}>
                {GetUserDataReducer.isLoading ?
                    <Text style={{ color: 'white' }}>Yükleniyor...</Text>
                    :
                    <Text style={{ color: 'white', fontWeight: '700' }}>
                        {GetUserDataReducer.data.name} {GetUserDataReducer.data.surname}
                    </Text>
                }
                {GetUserDataReducer.isLoading ?
                    <Text style={{ color: 'white' }}>Yükleniyor...</Text>
                    :
                    <Text style={{ color: 'white' }}>
                        {GetUserDataReducer.data.bio}
                    </Text>
                }
            </View>
            <View style={{ flexDirection: 'row', marginLeft: wp('5%'), marginTop: hp('1.5%') }}>
                <TouchableOpacity
                    onPress={updateProfile}
                >
                    <View style={styles.editProfile}>
                        <Text style={{ color: 'white' }}>Profili Düzenle</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('uploadPhoto')}
                >
                    <Icon
                        name="plus-square"
                        color='white'
                        size={wp('8%')}
                        style={{ paddingLeft: wp('4%') }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profile: { flexDirection: 'row' },
    image: { width: wp('20%'), height: wp('20%'), borderRadius: wp('20%') / 2, margin: wp('3%') },
    profileDetail: {
        width: wp("20%"),
        height: wp("20%"),
        marginRight: wp("1%"),
        marginLeft: wp('3%'),
        marginTop: wp("2%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    introduction: { marginLeft: wp('5%') },
    editProfile: {
        width: wp('80%'),
        height: hp('5%'),
        borderWidth: wp('0.1%'),
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
})