import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../store/actions/getUserProfile';
export default function ProfileTitle({ navigation }) {

    const { GetUserReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserProfile())
        const willFocusSubscription = navigation.addListener('focus', () => {
            dispatch(getUserProfile())

        });

        return willFocusSubscription;
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.profile}>
                <Image
                    style={styles.image}
                    source={{ uri: 'https://i.pinimg.com/originals/67/68/e4/6768e47d53b56f6e7ec4531955b96175.jpg' }} />
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
                {GetUserReducer.isLoading ?
                    <Text style={{ color: 'white' }}>Yükleniyor...</Text>
                    :
                    <Text style={{ color: 'white', fontWeight: '700' }}>
                        {GetUserReducer.data.name}
                    </Text>
                }
                <Text style={{ color: 'white' }}>
                    KLU / Yazılım Müh.
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: wp('5%'), marginTop: hp('1.5%') }}>
                <TouchableOpacity>
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