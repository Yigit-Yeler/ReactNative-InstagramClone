import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HeaderIcons from '../components/HeaderIcons';
import ProfilePosts from '../components/ProfilePosts';

import ProfileTitle from '../components/ProfileTitle';

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
