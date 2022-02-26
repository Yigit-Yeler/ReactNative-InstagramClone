import firestore from '@react-native-firebase/firestore';
import React from 'react';
export default function updateDataFirestore(
    collection,
    docReference,
    data,
) {
    firestore()
        .collection(collection)
        .doc(docReference)
        .update({
            ...data
        })
        .then(() => {
            console.log('User updated!');
        });
}