import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { Component, useEffect } from 'react';
import {
    Alert, Button, Image, StyleSheet,
    Text, TextInput, TouchableHighlight, View
} from 'react-native';

export default function Credits() {
    const navigation = useNavigation();
    navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'GO_BACK') {
            e.preventDefault();
        }
    });
    useEffect(() => {
        //prevent back button

    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Credits</Text>
            <Text style={styles.text}>6234401623 กฤษฎา อินทะสอน</Text>
            <Text style={styles.text}>6234406823 กิตติภพ ด้วงช้าง</Text>
            <Text style={styles.text}>6234424023 ธนดล สิทธานนท์</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'Kanit_400Regular'
    },
    text: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 18,
        fontFamily: 'Kanit_400Regular'
    },
});
