import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import {
    Alert, Button, Image, StyleSheet,
    Text, TextInput, TouchableHighlight, View
} from 'react-native';

// import CookieManager from '@react-native-cookies/cookies';
import { Kanit_400Regular, useFonts } from '@expo-google-fonts/kanit';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


export default function SignIn() {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            // saving error
        }
    }


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
        //clear storage
        console.log('clear storage')
        getData().then((value) => {
            if (value != null) {
                console.log('value is not null')
                navigation.navigate('Main')
            }
        })
    }, [])

    //cookie


    const SignIn = () => {
        axios.post('https://cache111.com/todoapi/tokens',
            { id: id, password: password },
            // {
            //     headers: {
            //         // Authorization: 'Bearer ' + token
            //     }, timeout: 10 * 1000
            // }
        ).then((response) => {
            // Alert.alert('Ok ' + response.status)
            storeData(response.data.token)
            setId('')
            setPassword('')
            getData().then((value) => {
                if (value != null) {
                    navigation.navigate('Main')
                }
            })
            // navigation.navigate('Main');
        }).catch((error) => {
            Alert.alert('Error ' + error.response.status)
            // navigation.navigate('Main');
        })
    }

    
    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#DCDCDC',
            fontFamily: 'Kanit_400Regular'
        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            width: 250,
            height: 45,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        inputs: {
            height: 45,
            borderBottomColor: '#FFFFFF',
            flex: 1,
            fontFamily: 'Kanit_400Regular'

        },
        inputIcon: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        buttonContainer: {
            height: 45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            width: 250,
            borderRadius: 30,
            fontFamily: 'Kanit_400Regular'
        },
        loginButton: {
            backgroundColor: "#00b5ec",
            fontFamily: 'Kanit_400Regular'

        },
        loginText: {
            color: 'white',
            fontFamily: 'Kanit_400Regular'

        }
    });

    return (
        <View style={styles.container}>

            <Text style={{ fontSize: 30, marginBottom: 20, fontFamily: 'Kanit_400Regular' }}>Sign In</Text>
            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="ID"
                    keyboardType="number-pad"
                    value={id}
                    underlineColorAndroid='transparent'
                    onChangeText={(id) => setId(id)} />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => setPassword(password)} />
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { SignIn() }}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
        </View>
    );

}