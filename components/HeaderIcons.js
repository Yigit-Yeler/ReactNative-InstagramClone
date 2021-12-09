import React, { useEffect, useState } from 'react'

import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default HeaderIcons = ({ navigation }) => {

    // import { useSelector } from 'react-redux';
    // import { useDispatch } from 'react-redux';
    // import { selectPhoto } from '../store/actions/selectPhoto';

    // export default function ProfilePosts() {

    //     const { SelectPhoto } = useSelector(state => state)
    //     const dispatch = useDispatch()

    //     const selectFile = () => {
    //         dispatch(selectPhoto())
    //         console.log(SelectPhoto.data.assets[0].uri)
    //     }
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
                <Icon
                    name="bars"
                    color='white'
                    size={wp('7%')}
                />
            </TouchableOpacity>
        </View>
    )
}

