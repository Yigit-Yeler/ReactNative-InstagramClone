import React from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Icons from '../components/postComponents/Icons';
export default function MyPost({ route }) {
    const { img, desc } = route.params;
    const { GetUserDataReducer } = useSelector(state => state)
    return (
        <View style={styles.main}>
            <Image style={styles.images} source={{ uri: img }} />
            <Icons />
            <View style={styles.descMain}>
                <View style={styles.desc}>

                    <Text style={{ color: 'white', fontWeight: '700' }}>
                        {GetUserDataReducer.data.username}
                    </Text>
                    <Text style={{ color: 'white' }}> {desc}
                    </Text>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'black',
        flex: 1
    },
    images: {
        flex: 1,
        width: wp("100%"),
    },
    descMain: {
        flex: 0.8,
        width: wp("100%"),
        height: wp("15%"),
        paddingHorizontal: wp("5%")
    },
    desc: {
        flexDirection: 'row'
    }
})