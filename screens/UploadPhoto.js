import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { utils } from '@react-native-firebase/app';
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

export default function UploadPhoto({ navigation }) {
    const { SelectPhoto } = useSelector(state => state)
    const dispatch = useDispatch()
    const [imageUrl, setImgUrl] = useState()

    const reference = storage().ref('images/')

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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {
                    imageUrl != null ?

                        (<TouchableOpacity
                            onPress={() => selectFile()}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: imageUrl }} />
                        </TouchableOpacity>)
                        :
                        <TouchableOpacity
                            onPress={() => selectFile()}
                        >
                            <View style={styles.uploadPhoto} >
                                <Text style={{ fontWeight: '700', color: 'black' }}>
                                    Fotoğraf Seçiniz...
                                </Text>
                            </View>
                        </TouchableOpacity>
                }

                <TextInput
                    placeholder="Açıkama yaz..."
                    placeholderTextColor="grey"
                    style={styles.input}
                />
            </View>
            <View>
                <TouchableOpacity
                    onPress={async () => {
                        // path to existing file on filesystem
                        // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
                        // uploads file
                        // await reference.putFile(pathToFile);
                        await reference.putFile(imageUrl);

                    }}
                >
                    <Icon
                        name="check"
                        color="#4B39E6"
                        size={wp('7%')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black',

    },
    image: {
        width: wp('25%'),
        height: wp('25%')
    },
    input: {
        width: wp('65%'),
        color: 'white',
        marginLeft: wp('2%'),
        marginRight: wp('2%')
    },
    uploadPhoto: {
        width: wp('25%'),
        height: wp('25%'),
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
