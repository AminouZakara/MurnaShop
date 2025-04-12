import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';




const ProfileScreen = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        // place the name of the App on right corner, the notification icon on left corner and the search bar bellow them
        navigation.setOptions({
            headerTitle: () => (<View
                style={styles.addToCartButton}
            >
                <Text style={{marginLeft:4, color: "#FF9900", fontSize: 18, textAlign: "center" }}>Name Surname</Text>
            </View>),
            headerStyle: {
                backgroundColor: "white",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
            },
            headerLeft: () => (
                <View style={{ marginLeft: 10, }}>
                    <Image
                        source={require("../../assets/images/logo.png")}

                       // source={{ uri: user.photoURL }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50
                        }}

                    />
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginRight: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}
                        style={{ marginRight: 10, }}>
                        <MaterialIcons name="support-agent" size={30} color="#FF9900" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                        <MaterialIcons name="settings" size={25} color="grey" />
                    </TouchableOpacity>

                </View>
            )

        });
    }, [navigation]);

    const [loading, setLoading] = useState(true);



    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
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
            </View>

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
        justifyContent: 'center',
    },
    textContainer: { marginBottom: 2, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 8 },
    textTitle: { fontSize: 16 }
})