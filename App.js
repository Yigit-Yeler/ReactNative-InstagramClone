/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './screens/HomePage';
import Profile from './screens/ProfilePage';
import UploadPhoto from './screens/UploadPhoto';
import Register from './screens/Register';

import HeaderIcons from './components/HeaderIcons';
import HeaderRight from './components/uploadPhotoComponents/HeaderRight';
import HeaderLeft from './components/uploadPhotoComponents/HeaderLeft';

import { Provider } from 'react-redux';
import store from './store'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Kayıt Ol"
            component={Register}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'grey',
              headerTitleAlign: 'center'
            }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{
              title: "Profile",
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerRight: () => (
                <HeaderIcons />
              )
            }} />
          <Stack.Screen
            name="uploadPhoto"
            component={UploadPhoto}
            options={{
              headerStyle: { backgroundColor: 'black' },
              headerTintColor: 'white',
              headerLeft: () => (
                <HeaderLeft />
              ),
              headerRight: () => (
                <HeaderRight />
              )

            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // <SafeAreaView>
    //   <Header
    //     leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
    //     centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    //     rightComponent={{ icon: 'home', color: '#fff' }}
    //   />
    // </SafeAreaView>
  );
};


export default App;
