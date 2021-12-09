import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectPhoto } from '../store/actions/selectPhoto';
import Icon from 'react-native-vector-icons/FontAwesome';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage'

export default function UploadPhoto() {
    const { SelectPhoto } = useSelector(state => state)
    const dispatch = useDispatch()

    const reference = storage().ref('images/').child("user/");

    const selectFile = () => {
        dispatch(selectPhoto())
    }
    return (
        <View style={styles.main}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {
                    SelectPhoto.data.uri ?

                        (<TouchableOpacity
                            onPress={() => selectFile()}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: SelectPhoto.data.uri }} />
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
                        await reference.putFile(SelectPhoto.data.uri);

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
