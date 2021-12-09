import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage'

export default function HeaderRight() {
    const reference = storage().ref('images');
    return (
        <View>
            <TouchableOpacity
                onPress={async () => {
                    // path to existing file on filesystem
                    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/foto.png`;
                    // uploads file
                    await reference.putFile(pathToFile);
                }}
            >
                <Icon
                    name="check"
                    color="#4B39E6"
                    size={wp('7%')}
                />
            </TouchableOpacity>
        </View>
    )
}
