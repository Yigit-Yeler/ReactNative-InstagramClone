import firestore from '@react-native-firebase/firestore';
import React from 'react';
export function insertDataFirestore(
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

export function insertNestedDataFirestore(
    collection1,
    docReference1,
    collection2,
    docReference2,
    data,
    navigation
) {
    firestore()
        .collection(collection1)
        .doc(docReference1)
        .collection(collection2)
        .doc(docReference2)
        .set({
            ...data
        })
        .then(() => {
            console.log('Datas inserted!');
            navigation.navigate("profile")
        });
}