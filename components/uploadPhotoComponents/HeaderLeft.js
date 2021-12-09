import React from 'react'

import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HeaderLeft() {
    return (
        <View>
            <TouchableOpacity>
                <Icon
                    name="arrow-left"
                    color="white"
                    size={wp('7%')}
                    style={{ paddingRight: wp('5%') }}
                />
            </TouchableOpacity>
        </View>
    )
}
