import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth, { firebase } from '@react-native-firebase/auth'
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { app } from './firebaseConfig'
import { FIREBASE_WEB_CLIENT_ID } from '@env';


const LoginScreen = () => {
    const navigation = useNavigation()
    const db = getFirestore(app)
    GoogleSignin.configure({
        webClientId: FIREBASE_WEB_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
    });

    console.log("webClientId", FIREBASE_WEB_CLIENT_ID);
    //autosignin
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                setAuthUser(user)
                navigation.navigate("Main")
            } else {
                setAuthUser(null)
            }
        });
        return subscriber
    }, [])


    //states
    const [isLoading, setIsLoading] = useState(false);

    // Sign in with Google 
    const signInWithGoogle = async () => {
        setIsLoading(true)
        try {
            const result = await GoogleSignin.signIn();
            const token = result.data.idToken;
            const credentials = firebase.auth.GoogleAuthProvider.credential(token);
            const userCredentials = await firebase.auth().signInWithCredential(credentials);
            const user = userCredentials.user;
            setAuthUser(userCredentials.user)
            //if the user doesn't exist save them in firestore
            const userRef = doc(db, "murnaShoppingUsers", user.uid);
            if (userCredentials.additionalUserInfo.isNewUser) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    userId: user.uid,
                    city: "",
                    address: "",
                    storeAddress: "",
                    phoneNumber: "",
                    role: 'user',
                    sellerOf: "",
                    createdAt: new Date(),
                });
                console.log('User created');
                navigation.navigate('Main');
                setIsLoading(false)
            } else {
                await updateDoc(userRef, {
                    lastLogin: new Date(),
                });
                console.log('User already exists');
                navigation.navigate('Main');
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)

        }
    }
    
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    onPress={signInWithGoogle}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        color: '#fff',
        fontSize: 16,

    }
})