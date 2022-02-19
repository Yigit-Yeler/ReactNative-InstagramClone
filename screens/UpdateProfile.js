import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { getUserProfile } from '../store/actions/getUserProfile';

export default function UpdateProfile() {

    const { GetUserReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    const [imgUrl, setImgUrl] = useState()

    useEffect(() => {
        setImgUrl(GetUserReducer.data.photoURL)
    }, [])


    const updateProfile = async () => {
        let update = {
            photoURL: imgUrl
        }

        await auth().currentUser.updateProfile(update)
        dispatch(getUserProfile())
    }

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

            <View style={styles.textView}>
                <TouchableOpacity
                    onPress={updateProfile} >
                    <Text style={{ color: 'blue' }}>
                        Kaydet
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
        width: wp('30%'),
        height: wp('30%'),
        borderRadius: wp('30%') / 2,
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
