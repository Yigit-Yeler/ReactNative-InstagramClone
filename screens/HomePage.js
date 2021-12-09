import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDatas } from '../store/actions/getData';
import firestore from '@react-native-firebase/firestore';

export default HomePage = () => {
    const { GetDataReducer } = useSelector(state => state)
    const dispatch = useDispatch()
    const [num, setNum] = useState(0);

    useEffect(() => {
        const subscriber = firestore()
            .collection('data')
            .doc("1XzVDLi8XAMURpgLoEYJ")
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                setNum(num + 0.001)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [GetDataReducer]);

    useEffect(() => {
        dispatch(getDatas())
    }, [])

    return (
        <View>
            {GetDataReducer.isLoading ? <Text>Yükleniyor...</Text> : GetDataReducer.datas.map(item => (
                <View key={item.name}>
                    <Text>{item.name}</Text>
                    <Text>{item.surname}</Text>
                </View>
            ))}
        </View>
    )
}
