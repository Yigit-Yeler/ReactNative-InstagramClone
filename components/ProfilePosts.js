import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatGrid } from 'react-native-super-grid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectPhoto } from '../store/actions/selectPhoto';

export default function ProfilePosts() {



    return (
        <View style={{ flex: 1.87 }}>

            <View style={styles.posts}>
                <Icon
                    name="th"
                    color='white'
                    size={wp('7%')}
                />
            </View>


            <FlatGrid
                itemDimension={100}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1]}
                nestedScrollEnabled
                renderItem={({ item }) => (<View style={styles.gridView}><Text>{item}</Text></View>)}

            />

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
        backgroundColor: 'red',
        margin: 0
    }
})
