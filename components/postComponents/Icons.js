import React from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Icons() {
    return (
        <View style={styles.icons}>
            <View style={styles.icons1}>
                <Icon
                    style={styles.icon}
                    name="heart-o"
                    size={wp('7%')}
                />
                <Icon
                    style={styles.icon}
                    name="comment-o"
                    size={wp('7%')}
                />
                <Icon
                    style={styles.icon}
                    name="send-o"
                    size={wp('7%')}
                />
            </View>
            <View style={styles.icons2}>
                <Icon
                    style={styles.icon}
                    name="bookmark-o"
                    size={wp('7%')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icons1: {
        width: wp('50%'),
        height: wp('15%'),
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: wp('5%'),
    },
    icons2: {
        width: wp('50%'),
        height: wp('15%'),
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    icons: {
        flexDirection: 'row',

    },
    icon: {
        paddingRight: wp('5%')
    }
})