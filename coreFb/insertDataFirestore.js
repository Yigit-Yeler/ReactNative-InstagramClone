import firestore from '@react-native-firebase/firestore';
import React from 'react';
export default function insertDataFirestore(
    collection,
    docReference,
    data,
    navigation
) {
    firestore()
        .collection(collection)
        .doc(docReference)
        .set({
            ...data
        })
        .then(() => {
            console.log('Datas inserted!');
            navigation.navigate("profile")
        });
}