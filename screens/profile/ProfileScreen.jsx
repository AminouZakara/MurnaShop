import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const user = auth().currentUser;
    const currentUserUid = auth().currentUser.uid;
    const [loading, setLoading] = useState(true);

    const [authUser, setAuthUser] = useState(null)
    const logout = () => {
        auth().signOut()
            .then(() => {
                setAuthUser(null)
                console.log("User signed Out");
                navigation.navigate("LoginScreen")

            })
            .catch(error => {
                console.log(error);
            });
        console.log('Logout button pressed')
    }
    //getUserData from fb
    useEffect(() => {
        getUserData();
    }, [])
    const [userData, setUserData] = useState([]);
    const getUserData = async () => {
        setLoading(true)
        try {
            const userRef = doc(db, "murnaShoppingUsers", currentUserUid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                setUserData(docSnap.data());
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    console.log("currentUserUid:", currentUserUid);
    console.log("userData name:", userData?.name);
    console.log("userData phoneNumber:", userData?.phoneNumber);
    console.log("userData address:", userData?.address);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text>Profile Screen</Text>
                <Image
                    source={{ uri: user.photoURL }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50
                    }}

                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile", {
                        userData: userData,
                    })}
                    style={{ marginBottom: 10 }}>
                    <AntDesign name="edit" size={24} color="green" />
                </TouchableOpacity>
                <Text style={{ textAlign: "center" }}>{user ? user.email : 'No User'}</Text>

                <TouchableOpacity
                    onPress={logout}
                    style={{
                        backgroundColor: 'red',
                        padding: 10,
                        borderRadius: 10,
                        margin: 10
                    }}

                >
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        textAlign: "center"
                    }}>Logout</Text>
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
        padding: 10
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})