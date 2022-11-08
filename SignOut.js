import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { Component, useEffect } from 'react';
import {
    Alert, Button, Image, StyleSheet,
    Text, TextInput, TouchableHighlight, View
} from 'react-native';

export default function SignOut() {
    const navigation = useNavigation();
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                // value previously stored
                return value
            }
        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        //prevent back button

        //clear storage

    }, [])
    AsyncStorage.clear()
    getData().then((value) => {
        console.log(value)
        if (!value) {
            navigation.getParent().navigate('SignIn')

        }

    })
    return (
        <View>
        </View>
    );

}
