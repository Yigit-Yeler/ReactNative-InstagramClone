import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function RegisterButton() {
    return (
        <TouchableOpacity>
            <View style={styles.button}>
                <Text style={styles.text}>Kayıt Ol</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
