import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker'
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { getUserProfile } from '../store/actions/getUserProfile';
import { getUserData } from '../store/actions/getUserData';
import updateDataFirestore from '../coreFb/updateDataFirestore';

export default function UpdateProfile() {

    const { GetUserReducer } = useSelector(state => state)
    const { GetUserDataReducer } = useSelector(state => state)
    const dispatch = useDispatch()

    const [imgUrl, setImgUrl] = useState()
    const [userId, setUserId] = useState()

    const [name, setName] = useState(GetUserDataReducer.data.name)
    const [surname, setSurname] = useState(GetUserDataReducer.data.surname)
    const [username, setUsername] = useState(GetUserDataReducer.data.username)
    const [bio, setBio] = useState(GetUserDataReducer.data.bio)

    // const [tmpData, setTmpData] = useState({
    //     "username": GetUserDataReducer.data.username,
    //     "name": GetUserDataReducer.data.name,
    //     "surname": GetUserDataReducer.data.surname,
    //     "bio": GetUserDataReducer.data.bio
    // })

    const handleOnChange = (text, textName) => {
        // setTmpData({ [name]: text })
        switch (textName) {
            case "name":
                setName(text);
                console.log(name)
                break;
            case "surname":
                setSurname(text);
                break;
            case "username":
                setUsername(text);
                break;
            case "bio":
                setBio(text);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setImgUrl(GetUserReducer.data.photoURL)
        setUserId(GetUserReducer.data.uid)
        // setTmpData({
        //     "username": GetUserDataReducer.data.username,
        //     "name": GetUserDataReducer.data.name,
        //     "surname": GetUserDataReducer.data.surname,
        //     "bio": GetUserDataReducer.data.bio
        // })
    }, [])

    const updateProfile = async () => {
        let update = {
            photoURL: imgUrl
        }

        let tmpData = {
            "name": name,
            "surname": surname,
            "username": username,
            "bio": bio
        }
        await auth().currentUser.updateProfile(update)

        updateDataFirestore("data", userId, tmpData)
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
                        Change Profile Photo
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={styles.textView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Name
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text) => handleOnChange(text, "name")}
                    style={styles.textInput}
                    value={name}
                />
            </View>
            <View style={styles.textView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Surname
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text) => handleOnChange(text, "surname")}
                    style={styles.textInput}
                    value={surname}
                />
            </View>
            <View style={styles.textView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        User Name
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text) => handleOnChange(text, "username")}
                    style={styles.textInput}
                    value={username}
                />
            </View>
            <View style={styles.textView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        Biografi
                    </Text>
                </View>
                <TextInput
                    onChangeText={(text) => handleOnChange(text, "bio")}
                    style={styles.textInput}
                    value={bio}
                />
            </View>

            <View style={styles.textView}>
                <TouchableOpacity
                    onPress={updateProfile} >
                    <Text style={{ color: 'blue' }}>
                        Save Changes
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
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('25%') / 2,
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
    },
    textInput: {
        borderBottomColor: 'white',
        width: wp("90%"),
        color: 'white',
        borderWidth: 1,
        height: hp("6%")
    },
    titleText: {
        color: 'grey',
    },
    titleView: {
        textAlign: 'left',
        width: wp("90%"),
    }


})
