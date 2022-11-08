import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePicker, DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import {
    Alert, Button, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableOpacity, View
} from 'react-native';

import { Kanit_400Regular, useFonts } from '@expo-google-fonts/kanit';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Snackbar } from 'react-native-paper';
export default function Main() {
    const navigation = useNavigation();
    const [token, setToken] = useState('')
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



    navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'GO_BACK') {
            e.preventDefault();
        }
    });


    useEffect(() => {
        //prevent back button
        getData().then((value) => {
            if (value == null) {
            }
            else {
                setToken(value)
            }
        })

        //clear storage


    }, [])

    axios.get('https://cache111.com/todoapi/Activities', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err)
        })

    const [modalVisible, setModalVisible] = useState(false)
    const [modalAddVisible, setModalAddVisible] = useState(false)
    const [selected, setSelected] = useState([])
    const [selectedName, setSelectedName] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [addName, setAddName] = useState('')
    const [addDate, setAddDate] = useState('')
    const [addTime, setAddTime] = useState('')


    const [successText, setSuccessText] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)
    const [failText, setFailText] = useState('')
    const [failVisible, setFailVisible] = useState(false)

    const successSnackbar = (text) => {
        setSuccessText(text)
        setSuccessVisible(true)

        setTimeout(() => {
            setSuccessVisible(false)
        }, 2000)
    }


    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (modalVisible) {
            setSelected(selected)
            //check mode
            setSelectedDate(toThaiDate(currentDate))
        }
        else if (modalAddVisible) {
            setAddDate(toThaiDate(currentDate))
        }



    };

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate;

        if (modalVisible) {
            setSelected(selected)
            //check mode
            setSelectedTime(toThaiTime(currentDate))
        }
        else if (modalAddVisible) {
            setAddTime(toThaiTime(currentDate))
        }



    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(selected.when),
            onChange: onChangeDate,
            mode: 'date',
            is24Hour: true,
        });
    };

    const showTimepicker = () => {
        DateTimePickerAndroid.open({
            value: new Date(selected.when),
            onChange: onChangeTime,
            mode: 'time',
            is24Hour: true,
        });
    };


    const [data, setData] = useState([
        { id: 1, name: "Comunity", image: "https://img.icons8.com/clouds/100/000000/groups.png", when: 124.711 },
        { id: 2, name: "Housing", image: "https://img.icons8.com/color/100/000000/real-estate.png", when: 234.722 },
        { id: 3, name: "Jobs", image: "https://img.icons8.com/color/100/000000/find-matching-job.png", when: 324.723 },
        { id: 4, name: "Personal", image: "https://img.icons8.com/clouds/100/000000/employee-card.png", when: 154.573 },
        { id: 5, name: "For sale", image: "https://img.icons8.com/color/100/000000/land-sales.png", when: 124.678 },
    ]
    )

    const styles = StyleSheet.create({
        header: {
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: '#ddd',
            marginTop: 30,

        },
        headerText: {
            fontSize: 34,
            color: 'black',
            textAlign: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        container: {
            flex: 1,
            backgroundColor: "#ebf0f7",
            fontFamily: 'Kanit_400Regular'

        },
        contentList: {
            flex: 1,

        },

        cardContent: {
            flex: 1,
            alignItems: 'flex-end',
        },

        card: {
            shadowColor: '#00000021',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,
            elevation: 12,

            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,

            backgroundColor: "white",
            padding: 10,
            flexDirection: 'row',
            borderRadius: 30,
        },

        name: {
            fontSize: 18,
            flex: 1,
            alignSelf: 'flex-start',
            paddingLeft: 20,
            fontFamily: 'Kanit_400Regular'
        },
        when: {
            fontSize: 14,
            flex: 1,
            alignSelf: 'flex-start',
            paddingLeft: 20,
            fontFamily: 'Kanit_400Regular'
        },
        optionButton: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        },
        followButton: {
            marginTop: 10,
            width: 100,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            //edit color
            backgroundColor: "#FFCC00",
            borderWidth: 1,
            borderColor: "white",
        },
        delButton: {
            marginTop: 10,
            width: 100,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: "red",
            borderWidth: 1,
            borderColor: "white",
        },
        followButtonText: {
            color: "#FFFFFF",
            fontSize: 15,
            fontFamily: 'Kanit_400Regular'

        },
        inputLabel: {
            fontSize: 28,
            color: "black",
            flex: 1,
            alignSelf: 'center',
            marginBottom: 10,
            fontFamily: 'Kanit_400Regular'


        },
        inputContainer: {
            borderBottomColor: '#F5FCFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            width: 250,
            marginBottom: 20,
            flexDirection: 'column',
            alignContent: 'flex-start',
            fontFamily: 'Kanit_400Regular'

        },
        inputs: {
            borderColor: 'black',
            flex: 1,
            borderWidth: 1,
            borderRadius: 30,
            paddingLeft: 16,
            backgroundColor: 'white',
            fontSize: 24,
            color: 'black',
            fontFamily: 'Kanit_400Regular'


        },
        DateTimeInput: {
            borderBottomColor: '#F5FCFF',
            backgroundColor: '#FFFFF',
            borderRadius: 30,
            borderBottomWidth: 1,
            width: 250,
            height: 45,
            marginBottom: 20,
            flexDirection: 'row',
            alignContent: 'flex-start',
            fontFamily: 'Kanit_400Regular'

        },
        dateText: {
            fontSize: 24,
            flex: 1,
            alignSelf: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        floatingButton: {
            position: 'absolute',
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            backgroundColor: '#00b5ec',
            borderRadius: 100,
            elevation: 8,
            fontFamily: 'Kanit_400Regular'


        },
        floatingText: {
            fontSize: 36,
            padding: 0,
            color: 'white',
            alignContent: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        /************ modals ************/
        popup: {
            backgroundColor: 'white',
            marginTop: 80,
            marginHorizontal: 20,
            borderRadius: 7,
        },
        popupOverlay: {
            backgroundColor: "#00000057",
            flex: 1,
            marginTop: 30
        },
        popupContent: {
            //alignItems: 'center',
            margin: 20,
        },
        popupHeader: {
            marginBottom: 45
        },
        popupButtons: {
            marginTop: 15,
            marginBottom: 10,
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: "transparent",
            justifyContent: 'flex-end'

        },
        popupButton: {
            flex: 1,
            marginVertical: 16,

        },

        modalInfo: {
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Kanit_400Regular'

        },
        btnSave: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#00b5ec",
            marginEnd: 10

        },
        saveText: {
            color: 'white',
            fontSize: 20,
            fontFamily: 'Kanit_400Regular'

        },
        btnCancel: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#ff0000",
            marginEnd: 10
        },
        cancelText: {
            color: 'white',
            fontSize: 20,
            fontFamily: 'Kanit_400Regular'

        },
        btnSelect: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            backgroundColor: "blue",
            marginEnd: 10
        },
        selectText: {
            color: 'white',
            fontSize: 20,
            fontFamily: 'Kanit_400Regular'

        },
    });


    const clickEventListener = (item) => {
        setSelected(item)
        setSelectedName(item.name)

        setSelectedDate(toThaiDate(item.when))
        setSelectedTime(toThaiTime(item.when))
        setModalVisible(true)
    }

    const toThaiDateTime = (date) => {
        const d = new Date(date);
        const year = d.getFullYear() + 543;
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hour = d.getHours();
        const minute = d.getMinutes().toString().padStart(2, '0');


        return `${day}/${month}/${year}  ${hour}:${minute}`;

    }

    const toUSDateTime = (date, time) => {

        const year = date.split('/')[2] - 543;
        const month = date.split('/')[1];
        const day = date.split('/')[0];
        const hour = time.split(':')[0]
        const minute = time.split(':')[1];

        return new Date(year, month - 1, day, hour, minute);

    }

    const toThaiDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear() + 543;
        const month = d.getMonth() + 1;
        const day = d.getDate();

        return `${day}/${month}/${year}`;

    }

    const toThaiTime = (date) => {
        const d = new Date(date);
        const hour = d.getHours();
        const minute = d.getMinutes().toString().padStart(2, '0');


        return `${hour}:${minute}`;

    }

    const addActivityOnclick = () => {
        setAddName('')
        setAddDate(toThaiDate(new Date()))
        setAddTime(toThaiTime(new Date()))
        setModalAddVisible(true)
    }

    const updateActivity = () => {
        const newActivity = {
            id: selected.id,
            name: selectedName,
            when: toUSDateTime(selectedDate, selectedTime),
        }
        const newActivities = data.map((item) => {
            if (item.id == selected.id) {
                return newActivity
            }
            return item
        })
        axios.put(`https://cache111.com/todoapi/Activities/${newActivity.id}`, {
            name: newActivity.name,
            when: newActivity.when
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setData(newActivities)
                setModalVisible(false)
                successSnackbar("แก้ไขกิจกรรมสำเร็จ")
            })
            .catch(err => {
                console.log(err)
            })

    }

    const addActivity = () => {
        const newActivity = {
            name: addName,
            when: toUSDateTime(addDate, addTime)
        }


        axios.post(`https://cache111.com/todoapi/Activities`, newActivity, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                newActivity.id = res.data.id
                setData([...data, newActivity])
                setModalAddVisible(false)
                successSnackbar("เพิ่มกิจกรรมสำเร็จ")
            }
            )
            .catch(err => {
                console.log(err)
            })
    }

    const deleteActivity = (item) => {
        //alert confirm
        Alert.alert(
            'ยืนยันการลบ',
            'คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?',
            [
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'ตกลง',
                    onPress: () => {
                        axios.delete(`https://cache111.com/todoapi/Activities/${item.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                            .then(res => {
                                const newActivities = data.filter((e) => e.id != item.id)
                                setData(newActivities)
                                successSnackbar("ลบกิจกรรมสำเร็จ")

                            })
                            .catch(err => {
                                console.log(err)
                            })
                    },
                },
            ],
            { cancelable: false },
        );
    }







    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>To Do List</Text>
                <TouchableOpacity style={styles.floatingButton} onPress={() => addActivityOnclick()}>
                    <Text style={styles.floatingText}>+
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={data}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.when} >{toThaiDateTime(item.when)}</Text>
                                <View style={styles.optionButton}>
                                    <TouchableOpacity style={styles.followButton} onPress={() => clickEventListener(item)}>
                                        <Text style={styles.followButtonText}>แก้ไข</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.delButton} onPress={() => deleteActivity(item)}>
                                        <Text style={[styles.followButtonText]}>ลบ</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <Modal
                                animationType={'fade'}
                                transparent={true}
                                onRequestClose={() => setModalVisible(false)}
                                visible={modalVisible}>

                                <View style={styles.popupOverlay}>
                                    <View style={styles.popup}>
                                        <View style={styles.popupContent}>
                                            <ScrollView contentContainerStyle={styles.modalInfo}>
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.inputLabel}>ชื่อกิจกรรม</Text>
                                                    <TextInput style={styles.inputs}
                                                        placeholder="ชื่อกิจกรรม"
                                                        underlineColorAndroid='transparent'
                                                        value={selectedName}

                                                        onChangeText={(name) => setSelectedName(name)} />
                                                </View>
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.inputLabel}>วัน เวลา</Text>
                                                </View>
                                                <View style={styles.DateTimeInput}>
                                                    <Text style={styles.dateText}>{selectedDate}</Text>
                                                    <TouchableHighlight style={styles.btnSelect} onPress={() => { showDatepicker() }}>
                                                        <Text style={styles.selectText}>เลือกวันที่</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={styles.DateTimeInput}>
                                                    <Text style={styles.dateText}>{selectedTime}</Text>
                                                    <TouchableHighlight style={styles.btnSelect} onPress={() => { showTimepicker() }}>
                                                        <Text style={styles.selectText}>เลือกเวลา</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </ScrollView>
                                        </View>
                                        <View style={styles.popupButtons}>
                                            <TouchableHighlight style={styles.btnSave} onPress={() => { updateActivity() }}>
                                                <Text style={styles.saveText}>บันทึก</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.btnCancel} onPress={() => { setModalVisible(false) }}>
                                                <Text style={styles.cancelText}>ยกเลิก</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Modal
                                animationType={'fade'}
                                transparent={true}
                                onRequestClose={() => setModalAddVisible(false)}
                                visible={modalAddVisible}>

                                <View style={styles.popupOverlay}>
                                    <View style={styles.popup}>
                                        <View style={styles.popupContent}>
                                            <ScrollView contentContainerStyle={styles.modalInfo}>
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.inputLabel}>ชื่อกิจกรรม</Text>
                                                    <TextInput style={styles.inputs}
                                                        placeholder="ชื่อกิจกรรม"
                                                        underlineColorAndroid='transparent'
                                                        value={addName}
                                                        onChangeText={(name) => setAddName(name)} />
                                                </View>
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.inputLabel}>วัน เวลา</Text>
                                                </View>
                                                <View style={styles.DateTimeInput}>
                                                    <Text style={styles.dateText}>{addDate}</Text>
                                                    <TouchableHighlight style={styles.btnSelect} onPress={() => { showDatepicker() }}>
                                                        <Text style={styles.selectText}>เลือกวันที่</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={styles.DateTimeInput}>
                                                    <Text style={styles.dateText}>{addTime}</Text>
                                                    <TouchableHighlight style={styles.btnSelect} onPress={() => { showTimepicker() }}>
                                                        <Text style={styles.selectText}>เลือกเวลา</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </ScrollView>
                                        </View>
                                        <View style={styles.popupButtons}>
                                            <TouchableHighlight style={styles.btnSave} onPress={() => { addActivity() }}>
                                                <Text style={styles.saveText}>บันทึก</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.btnCancel} onPress={() => { setModalAddVisible(false) }}>
                                                <Text style={styles.cancelText}>ยกเลิก</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </Modal>


                        </View>
                    )
                }} />
            {/* success snackbar */}
            <Snackbar
                visible={successVisible}

                style={{ backgroundColor: "green" }}
            >
                <View><Text style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    padding: 10,
                    fontFamily: "Kanit_400Regular"
                }}>{successText}</Text></View>
            </Snackbar>

            {/* fail snackbar */}
            <Snackbar
                visible={failVisible}

                style={{ backgroundColor: "red" }}
            >
                <View><Text style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    padding: 10,
                    fontFamily: "Kanit_400Regular"
                }}>{failText}</Text></View>
            </Snackbar>


        </View>
    );

}

