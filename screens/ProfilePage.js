import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProfilePosts from '../components/profileComponents/ProfilePosts';

import ProfileTitle from '../components/profileComponents/ProfileTitle';

export default Profile = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <ProfileTitle navigation={navigation} />
            <ProfilePosts />
        </View>
    )
}

const styles = StyleSheet.create({
    main: { backgroundColor: 'black', width: '100%', height: '100%' }
})
