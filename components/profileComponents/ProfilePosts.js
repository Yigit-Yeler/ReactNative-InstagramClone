import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatGrid } from 'react-native-super-grid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectPhoto } from '../store/actions/selectPhoto';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { getPosts } from '../../store/actions/getPosts';
export default function ProfilePosts({ navigation }) {

    const { GetUserReducer } = useSelector(state => state)
    const { GetPostsReducer } = useSelector(state => state)
    const [userId, setUserId] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            dispatch(getPosts(GetUserReducer.data.uid))
        });
        return willFocusSubscription;
    }, [])


    const openPost = async (url) => {
        var data
        await firestore()
            .collection('posts')
            .doc(GetUserReducer.data.uid)
            .collection("post")
            // Filter results
            .where('img', '==', url)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    data = doc.data()
                })
            });

        navigation.navigate("myPost", data)
    }
    // console.log(GetPostsReducer.datas)



    // const listFilesAndDirectories = (reference, pageToken) => {
    //     return reference.list({ pageToken }).then(result => {
    //         // Loop over each item
    //         result.items.forEach(ref => {
    //             console.log(ref.storage._nativeModule.getDownloadURL());
    //         });

    //         if (result.nextPageToken) {
    //             return listFilesAndDirectories(reference, result.nextPageToken);
    //         }

    //         return Promise.resolve();
    //     });
    // }



    return (
        <View style={{ flex: 2.4 }}>

            <View style={styles.posts}>
                <Icon
                    name="th"
                    color='white'
                    size={wp('7%')}
                />
            </View>



            {
                GetPostsReducer.datas != [] ?
                    <FlatGrid
                        itemDimension={100}
                        data={GetPostsReducer.datas}
                        nestedScrollEnabled
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => openPost(item)}>
                                <Image style={styles.images} source={{ uri: item }} />
                            </TouchableOpacity>
                        )}

                    /> :
                    <FlatGrid
                        itemDimension={100}
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1]}
                        nestedScrollEnabled
                        renderItem={({ item }) => (<View style={styles.gridView}><Text>{item}</Text></View>)}

                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    posts: {
        width: wp("100%"),
        height: hp("7%"),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    gridView: {
        width: wp("31%"),
        height: wp("31%"),
        margin: 0
    },
    images: {
        width: wp("31%"),
        height: wp("31%")
    }
})
