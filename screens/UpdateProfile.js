import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native';

export default function UpdateProfile() {

    const [imgUrl, setImgUrl] = useState()

    const selectFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, res => {
            // console.log('Response = ', res);
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                var tmp = { "uri": res.assets[0].uri }
                console.log(tmp)
                setImgUrl(res.assets[0].uri)
            }
        });
    }
    return (
        <View style={styles.main}>
            <View style={styles.imageView}>
                {
                    imgUrl != null ?
                        (<Image
                            style={styles.image}
                            source={{ uri: imgUrl }} />
                        )
                        :
                        <Image
                            style={styles.image}
                            source={require('../assets/defaultpp.jpg')} />

                }


            </View>
            <View style={styles.textView}>
                <TouchableOpacity
                    onPress={selectFile} >
                    <Text style={{ color: 'blue' }}>
                        Profil Fotoğrafını Değiştir
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('20%') / 2,
    },
    imageView: {
        flexDirection: 'row',
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2%')

    },
    textView: {
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%')
    }


})
