import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, getDoc } from 'firebase/firestore';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/userSlice';
import auth from '@react-native-firebase/auth'





const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    // To fetch user data
    const { userData, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    const currentUser = auth().currentUser;
    const userId = currentUser.uid;

    console.log("current user id", userId);



    //getUserData from fb
    //console.log("user data store name", userData.storeName);
    //console.log("user storeCity", userData.storeCity);
    // console.log("User data from redux:", userData);
    //console.log("error getting user data from redux:", error);
    //console.log("current USer Uid:", auth.currentUser.uid);

    {/*   useEffect(() => {
        axios.get('http://192.168.158.131:3000/api/users')
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    console.log("users:", users);*/}

    return (
        <View style={styles.container}>
            {
                loading ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, color: "#FF9900" }}>Loading...</Text>
                    </View>
                ) : (
                    <View style={styles.subContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={require("../../assets/images/logo.png")}
                                    // source={{ uri: user.photoURL }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 50
                                    }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userData?.name}</Text>
                                    <Text style={{ fontSize: 14, color: "#FF9900" }}>{userData?.storeName}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}
                                    style={{ marginRight: 10, }}>
                                    <MaterialIcons name="support-agent" size={30} color="#FF9900" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                                    <MaterialIcons name="settings" size={25} color="grey" />
                                </TouchableOpacity>

                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("MyOrder")}
                            style={[styles.textContainer, { marginBottom: 28, }]}>
                            <Text style={styles.textTitle}> Mes commandes </Text>
                            <Ionicons name="chevron-forward" size={24} color="#FF9900" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("AdminHomeScreen")}
                            style={{
                                marginTop: 100,
                                backgroundColor: 'green',
                                padding: 10,
                                borderRadius: 10,
                                margin: 10
                            }}

                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: "center"
                            }}>Admin Panel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("AuthorHomeScreen")}
                            style={{
                                marginTop: 100,
                                backgroundColor: 'darkgreen',
                                padding: 10,
                                borderRadius: 10,
                                margin: 10
                            }}

                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: "center"
                            }}>Author Panel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("CargaisonScreen")}
                            style={{
                                marginTop: 100,
                                backgroundColor: 'darkgreen',
                                padding: 10,
                                borderRadius: 10,
                                margin: 10
                            }}

                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 18,
                                textAlign: "center"
                            }}>Cargaison</Text>
                        </TouchableOpacity>
                    </View>

                )
            }

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
    subContainer: {
        marginTop: 30,
        justifyContent: 'center',
    },
    textContainer: { marginBottom: 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 8 },
    textTitle: { fontSize: 16 }
})