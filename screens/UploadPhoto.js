import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { insertNestedDataFirestore } from '../coreFb/insertDataFirestore';
import { getPosts } from '../store/actions/getPosts';
import { Button } from 'react-native-elements';


export default function UploadPhoto({ navigation }) {
    const [imageUrl, setImgUrl] = useState()
    const [date, setDate] = useState("")
    const [desc, setDesc] = useState("")
    const [uid, setUid] = useState("")

    const dispatch = useDispatch();
    const { GetUserReducer } = useSelector(state => state)
    const { GetPostsReducer } = useSelector(state => state)


    useEffect(() => {
        setUid(GetUserReducer.data.uid)
    }, [])




    const reference = storage().ref(uid + "/").child(date + "/")

    const getDate = () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        setDate(date + '-' + month + '-' + year
            + ' ' + hours + ':' + min + ':' + sec)
        // hours += 8
        // if (hours < 24) {
        //     setDate(date + '-' + month + '-' + year
        //         + ' ' + hours + ':' + min + ':' + sec)
        // }
        // else {
        //     date++
        //     setDate(date + '-' + month + '-' + year
        //         + ' ' + hours + ':' + min + ':' + sec)
        // }

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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
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
                            onPress={() => {
                                getDate()
                                selectFile()
                            }}
                        >
                            <View style={styles.uploadPhoto} >
                                <Text style={{ fontWeight: '700', color: 'black' }}>
                                    Fotoğraf Seçiniz...
                                </Text>
                            </View>
                        </TouchableOpacity>
                }

                <TextInput
                    onChangeText={(text) => setDesc(text)}
                    placeholder="Açıkama yaz..."
                    placeholderTextColor="grey"
                    style={styles.input}
                />
            </View>
            <View
                style={styles.saveView}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await reference.putFile(imageUrl);
                        const url = await reference.getDownloadURL();
                        var tmpData = {
                            "desc": desc,
                            "img": url,
                            "like": 0,
                            "uid": uid,
                            "date": firestore.Timestamp.fromMillis(Date.now())
                        }
                        insertNestedDataFirestore("posts", GetUserReducer.data.uid, "post", "", tmpData, navigation)
                        // path to existing file on filesystem
                        // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
                        // uploads file
                        // await reference.putFile(pathToFile);
                    }}
                >
                    <Text
                        style={{ color: "#4B39E6", fontSize: 20 }}
                    >
                        Upload
                    </Text>
                    {/* <Icon
                        name="check"
                        color="#4B39E6"
                        size={wp('7%')}
                    /> */}
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
    },
    saveView: {
        width: wp('100%'),
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        width: wp('30%'),
        height: wp('10%'),
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    }
})
